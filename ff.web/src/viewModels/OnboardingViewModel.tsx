import { initialOnboardingData, steps } from "@constants/Onboarding";
import { OnboardingStatus } from "@models/Onboarding";
import {
  BaseViewModel,
  BaseViewModelProps,
} from "@vuo/viewModels/BaseViewModel";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import LoginViewModel from "@vuo/viewModels/LoginViewModel";

export default class OnboardingViewModel extends BaseViewModel {
  private loginViewModel: LoginViewModel;
  formData: Record<string, any> = initialOnboardingData;
  currentStep = 0;
  progress = 0;
  isExitOnboarding = false;
  loading = false;
  onboardingComplete: boolean;

  constructor(loginViewModel: LoginViewModel) {
    super();
    this.loginViewModel = loginViewModel;
    console.log('Constructor - Initial userId:', this.formData.userId);
    this.onboardingComplete =
      localStorage.getItem("onboardingComplete") === "true";
    makeObservable(this, {
      ...BaseViewModelProps,
      formData: observable,
      currentStep: observable,
      progress: observable,
      isExitOnboarding: observable,
      loading: observable,
      handleNext: action,
      handleBack: action,
      handleMultiSelect: action,
      handleInputChange: action,
      handleCuisinePreference: action,
      setIsExitOnboarding: action,
      calculateProgress: action,
      handleFinish: action,
      currentStepData: computed,
      hasFormDataChanged: computed,

      onboardingComplete: observable,
      setIsOnboardingComplete: action,
      isOnboardingComplete: computed,
    });

    this.loadInitialData();
  }

  setIsOnboardingComplete(value: boolean): void {
    this.onboardingComplete = value;
    localStorage.setItem("onboardingComplete", String(value));
  }

  get isOnboardingComplete(): boolean {
    return this.onboardingComplete;
  }

  get currentStepData() {
    return steps[this.currentStep];
  }

  get hasFormDataChanged(): boolean {
    return (
      JSON.stringify(this.formData) !== JSON.stringify(initialOnboardingData)
    );
  }

  async loadInitialData() {
    // Get the session userId first
    const sessionUserId = this.loginViewModel.sessionDataStore.profile?.userId;
    
    if (localStorage.getItem("onboardingData")) {
      const data = JSON.parse(localStorage.getItem("onboardingData") || "{}");
      runInAction(() => {
        // Ensure we use session userId instead of stored one
        this.formData = { ...data, userId: sessionUserId };
        this.calculateProgress();
      });
    } else {
      runInAction(() => {
        // Set correct userId in initial data
        this.formData = { ...this.formData, userId: sessionUserId };
      });
      this.calculateProgress();
    }
  }

  calculateProgress() {
    const completedSteps = steps.filter(
      (step) => step.status === OnboardingStatus.completed,
    ).length;
    this.progress = (completedSteps / steps.length) * 100;
  }

  handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    runInAction(() => {
      this.formData = { ...this.formData, [name]: value };
    });
  };

  handleMultiSelect = (
    item: string,
    field: "goals" | "allergies" | "dislikes",
  ) => {
    runInAction(() => {
      this.formData = {
        ...this.formData,
        [field]: this.formData[field].includes(item)
          ? this.formData[field].filter((i: string) => i !== item)
          : [...this.formData[field], item],
      };
    });
  };

  handleCuisinePreference = (
    cuisine: string,
    preference: "like" | "dislike",
  ) => {
    runInAction(() => {
      this.formData = {
        ...this.formData,
        cuisinePreferences: {
          ...this.formData.cuisinePreferences,
          [cuisine]:
            preference === this.formData.cuisinePreferences[cuisine]
              ? null
              : preference,
        },
      };
    });
  };

  handleNext = async () => {
    if (this.hasFormDataChanged) {
      if(this.formData.onboardingStatus === OnboardingStatus.notStarted) {
        this.formData.onboardingStatus = OnboardingStatus.inProgress;
      }
      const { userId } = this.loginViewModel.sessionDataStore.profile;
      try {
        await this.fetchData({
          url: `v1/profile/update/${userId}`,
          method: "PATCH",
          data: this.formData,
        });

        runInAction(() => {
          if (this.currentStep < steps.length - 1) {
            steps[this.currentStep].status = OnboardingStatus.completed;
            this.currentStep += 1;
            this.calculateProgress();
          }
        });
      } catch (error) {
        this.setErrors(
          error instanceof Error
            ? error
            : new Error("Failed to update profile"),
        );
      } finally {
        runInAction(() => {});
      }
    } else {
      this.moveToNextStep();
    }
  };

  private moveToNextStep() {
    if (this.currentStep < steps.length - 1) {
      runInAction(() => {
        steps[this.currentStep].status = OnboardingStatus.completed;
        this.currentStep += 1;
        this.calculateProgress();
      });
    }
  }

  handleBack = () => {
    if (this.currentStep > 0) {
      runInAction(() => {
        steps[this.currentStep].status = OnboardingStatus.notStarted;
        this.currentStep -= 1;
        this.calculateProgress();
      });
    }
  };

  setIsExitOnboarding = (value: boolean) => {
    this.isExitOnboarding = value;
  };

  handleFinish = async () => {
    //TODO CALL RECOMMENDER API TO UPDATE USER
    const { userId } = this.formData;
    const data = { ...this.formData, onboardingStatus: OnboardingStatus.completed, onboardingComplete: true };
    try {
      await this.fetchData({
        url: `v1/profile/update/${userId}`,
        method: "PATCH",
        data,
      });
      localStorage.setItem("profileData", JSON.stringify(this.formData));
      localStorage.removeItem("onboardingData");
      runInAction(() => {
        this.setIsOnboardingComplete(true);
      });
      return true;
    } catch (error) {
      this.setErrors(
        error instanceof Error ? error : new Error("Failed to update profile"),
      );
      return false;
    }
  };
}
