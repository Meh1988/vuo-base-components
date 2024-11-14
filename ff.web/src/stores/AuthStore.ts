import { makeAutoObservable, runInAction } from 'mobx';
import { User } from 'firebase/auth';
import { auth } from '../config/firebase';
import { signInWithGoogle, logOut } from '../auth/auth';

class AuthStore {
  user: User | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    
    // Set up auth state listener
    auth.onAuthStateChanged((user) => {
      runInAction(() => {
        this.user = user;
        this.loading = false;
      });
    });
  }

  signIn = async () => {
    try {
      this.loading = true;
      this.error = null;
      await signInWithGoogle();
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An unknown error occurred';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  signOut = async () => {
    try {
      this.loading = true;
      this.error = null;
      await logOut();
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An unknown error occurred';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

export const authStore = new AuthStore();