// @ts-nocheck
import { action, computed, makeObservable, observable, runInAction } from "mobx";

import {
  BaseViewModel,
  BaseViewModelProps,
} from "@vuo/viewModels/BaseViewModel";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import {
  AuthenticationResponseJSON,
  PublicKeyCredentialRequestOptionsJSON,
  PublicKeyCredentialCreationOptionsJSON,
} from "@simplewebauthn/types";

import sessionDataStore from "@vuo/stores/SessionDataStore";
import TagManager from "react-gtm-module";
import { ChannelUser } from "@vuo/stores/WebSocketStore";
import { signInWithGoogle } from "../auth/auth";
import { authStore } from '../stores/AuthStore';

interface AuthenticationOptions {
  options: PublicKeyCredentialRequestOptionsJSON;
  uuid: string;
}

interface AuthenticationVerifiedJSON {
  status: string;
  token: string;
  user: ChannelUser;
}

export default class LoginViewModel extends BaseViewModel {
  private sessionDataStore = sessionDataStore;
  onboardingComplete: boolean;
  isLoginModalOpen = false;

  constructor() {
    super();
    this.onboardingComplete = localStorage.getItem("onboardingComplete") === "true";

    makeObservable(this, {
      ...BaseViewModelProps,
      onboardingComplete: observable,
      setIsOnboardingComplete: action,
      isOnboardingComplete: computed,
      session: computed,
      startAuthentication: action,
      registerUser: action,
      signInWithGoogle: action,
      // signInWithFacebook: action,
      isLoginModalOpen: observable,
      toggleLoginModal: action,
    });
  }

  setIsOnboardingComplete(value: boolean): void {
    this.onboardingComplete = value;
    localStorage.setItem("onboardingComplete", String(value));
  }

  get isOnboardingComplete(): boolean {
    return this.onboardingComplete;
  }

  get session(): boolean {
    return !!this.sessionDataStore.token;
  }

  async startAuthentication(): Promise<void> {
    if (
      window.PublicKeyCredential &&
      PublicKeyCredential.isConditionalMediationAvailable
    ) {
      const isCMA = await PublicKeyCredential.isConditionalMediationAvailable();
      if (isCMA) {
        const authenticationOptionsResponse =
          await this.fetchData<AuthenticationOptions>({
            url: "v1/authenticate/generate-options",
          });

        if (authenticationOptionsResponse) {
          try {
            const asseResp: AuthenticationResponseJSON =
              await startAuthentication(authenticationOptionsResponse.options);
            const bodyPayload = {
              auth: asseResp,
              uuid: authenticationOptionsResponse.uuid,
            };
            const authenticateVerifyResponse =
              await this.fetchData<AuthenticationVerifiedJSON>({
                url: "v1/authenticate/verify",
                method: "POST",
                data: bodyPayload,
              });

            if (authenticateVerifyResponse) {
              runInAction(() => {
                sessionDataStore.token = authenticateVerifyResponse.token;
                sessionDataStore.user = authenticateVerifyResponse.user;
              })
            }
          } catch (error) {
            this.setErrors(
              error instanceof Error
                ? error
                : new Error("An unexpected error occurred"),
            );
          }
        } else {
          this.setErrors(new Error("failed to fetch auth options"));
        }
      }
    }
  }

  async registerUser(username: string, tpaId?: string): Promise<void> {
    const optionsResponse =
      await this.fetchData<PublicKeyCredentialCreationOptionsJSON>({
        url: "v1/register/generate-options",
        method: "POST",
        data: { username },
      });

    let attestation;
    try {
      attestation = await startRegistration(optionsResponse!);
    } catch (error) {
      this.setErrors(
        error instanceof Error
          ? error
          : new Error("Error with startRegistration"),
      );
    }

    const verificationResponse =
      await this.fetchData<AuthenticationVerifiedJSON>({
        url: "v1/register/verify",
        method: "POST",
        data: { username, attestation, tpaId },
      });

    TagManager.dataLayer({
      dataLayer: {
        event: "user_registered"
      },
    });

    sessionDataStore.token = verificationResponse?.token;
    sessionDataStore.user = verificationResponse?.user;
  }

  async signInWithGoogle(): Promise<void> {
    //TODO handle the situation when no need to merge anything
    try {
      const account = JSON.parse(localStorage.getItem('SessionDataStore') || '{}');
      const shadowAccountId = account?.shadowAccount ? account?.user._id : null;
      console.log('signInWithGoogle for first time :: shadowAccountId', shadowAccountId);
      if (!shadowAccountId) {
        throw new Error('No shadow account found to merge');
      }
  
      const user = await signInWithGoogle();
      if (!user) return;
  
      const response = await this.fetchData<AuthenticationVerifiedJSON>({
        url: "v1/authenticate/verify-firebase",
        method: "POST",
        data: { 
          token: await user.getIdToken(),
          shadowAccountId
        }
      });
  
      if (response) {
        runInAction(() => {
          sessionDataStore.token = response.token;
          sessionDataStore.user = response.user;
          sessionDataStore.shadowAccount = false;
          this.isLoginModalOpen = false;
        });
  
        // Clear shadow account after successful merging
        localStorage.removeItem('shadowAccountId');
      }
    } catch (error) {
      if (error.message === 'Sign-in cancelled by user') {
        console.log('User cancelled the sign-in process');
        return;
      }
      this.setErrors(error instanceof Error ? error : new Error("Failed to sign in with Google"));
    }
  }

  async updateUserProfile(userId: string): Promise<void> {
    try {
      const response = await this.fetchData({
        url: `v1/profile/update/${userId}`,
        method: "PATCH",
        data: { userId }
      });

      if (response) {
        runInAction(() => {
          sessionDataStore.profile = response.profile;
        });
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  }

  // async signInWithFacebook(): Promise<void> {
  //   try {
  //     const user = await signInWithFacebook();
  //     if (user) {
  //       const response = await this.fetchData<AuthenticationVerifiedJSON>({
  //         url: "v1/authenticate/verify-firebase",
  //         method: "POST",
  //         data: { token: await user.getIdToken() }
  //       });

  //       if (response) {
  //         runInAction(() => {
  //           sessionDataStore.token = response.token;
  //           sessionDataStore.user = response.user;
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     this.setErrors(error instanceof Error ? error : new Error("Failed to sign in with Facebook"));
  //   }
  // };

  async signUpWithEmail(email: string, password: string, displayName: string): Promise<void> {
    try {
      const user = await signUpWithEmail(email, password, displayName);
      if (user) {
        const response = await this.fetchData<AuthenticationVerifiedJSON>({
          url: "v1/authenticate/verify-firebase",
          method: "POST",
          data: { token: await user.getIdToken() }
        });
  
        if (response) {
          runInAction(() => {
            sessionDataStore.token = response.token;
            sessionDataStore.user = response.user;
            this.isLoginModalOpen = false;
          });
        }
      }
    } catch (error) {
      this.setErrors(error instanceof Error ? error : new Error("Failed to sign up with email"));
    }
  }
  
  async signInWithEmail(email: string, password: string): Promise<void> {
    try {
      const user = await signInWithEmail(email, password);
      if (user) {
        const response = await this.fetchData<AuthenticationVerifiedJSON>({
          url: "v1/authenticate/verify-firebase",
          method: "POST",
          data: { token: await user.getIdToken() }
        });
  
        if (response) {
          runInAction(() => {
            sessionDataStore.token = response.token;
            sessionDataStore.user = response.user;
            this.isLoginModalOpen = false;
          });
        }
      }
    } catch (error) {
      this.setErrors(error instanceof Error ? error : new Error("Failed to sign in with email"));
    }
  }

  async logout(): Promise<void> {
    try {
      // First clear session data and storage
      localStorage.clear(); // Clear all localStorage instead of individual items
      
      runInAction(() => {
        sessionDataStore.token = undefined;
        sessionDataStore.user = undefined;
        sessionDataStore.shadowAccount = false;
        sessionDataStore.username = "";
        sessionDataStore.profile = undefined;
      });

      // Then sign out from Firebase auth
      await authStore.signOut();
      
      // Finally call backend logout endpoint if we have a token
      if (sessionDataStore.token) {
        await this.fetchData({
          url: "v1/authenticate/logout", // The endpoint was wrong
          method: "POST",
          headers: {
            'Authorization': `Bearer ${sessionDataStore.token}`
          }
        });
      }

      // Clear local storage first
      localStorage.removeItem("SessionDataStore");
      localStorage.removeItem("onboardingComplete");
      localStorage.removeItem("profileData");

      // Then clear session data
      runInAction(() => {
        sessionDataStore.token = undefined;
        sessionDataStore.user = undefined;
        sessionDataStore.shadowAccount = false;
      });

      // Force a reload of the store
      await sessionDataStore.init();
      
    } catch (error) {
      this.setErrors(error instanceof Error ? error : new Error("Failed to logout"));
    }
  }

  toggleLoginModal() {
    runInAction(() => {
      this.isLoginModalOpen = !this.isLoginModalOpen;
    });
  }
}
