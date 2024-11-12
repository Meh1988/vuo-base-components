import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel, BaseViewModelProps } from "@vuo/viewModels/BaseViewModel";
import { OnboardingStatus } from "@models/Onboarding";
import { initialOnboardingData } from "@constants/Onboarding";
import { steps } from "@constants/Onboarding";

export default class OnboardingViewModel extends BaseViewModel {
  formData = initialOnboardingData;
  currentStep = 0;
  progress = 0;
  isExitOnboarding = false;
  loading = false;
  onboardingComplete: boolean;
  
  constructor() {
    super();
    this.onboardingComplete = localStorage.getItem("onboardingComplete") === "true";
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
      hasFormDataChanged: action,

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

  private hasFormDataChanged = (): boolean => {
    return JSON.stringify(this.formData) !== JSON.stringify(initialOnboardingData);
  };

  async loadInitialData() {
    const sessionData = JSON.parse(localStorage.getItem("SessionDataStore") || "{}");
    if (sessionData?.user?.id) {
      runInAction(() => {
        this.formData = { ...this.formData, userId: sessionData.user.id };
      });
    }

    if (localStorage.getItem("onboardingData")) {
      const data = JSON.parse(localStorage.getItem("onboardingData") || "{}");
      runInAction(() => {
        this.formData = data;
        this.calculateProgress();
      });
    } else {
      this.calculateProgress();
    }
  }

  calculateProgress() {
    const completedSteps = steps.filter(
      (step) => step.status === OnboardingStatus.completed
    ).length;
    this.progress = (completedSteps / steps.length) * 100;
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    runInAction(() => {
      this.formData = { ...this.formData, [name]: value };
    });
  };

  handleMultiSelect = (item: string, field: "goals" | "allergies" | "dislikes") => {
    runInAction(() => {
      this.formData = {
        ...this.formData,
        [field]: this.formData[field].includes(item)
          ? this.formData[field].filter((i: string) => i !== item)
          : [...this.formData[field], item],
      };
    });
  };

  handleCuisinePreference = (cuisine: string, preference: "like" | "dislike") => {
    runInAction(() => {
      this.formData = {
        ...this.formData,
        cuisinePreferences: {
          ...this.formData.cuisinePreferences,
          [cuisine]:
            preference === this.formData.cuisinePreferences[cuisine] ? null : preference,
        },
      };
    });
  };

  handleNext = async () => {
    if (this.hasFormDataChanged()) {
      const userId = this.formData.userId;
      try {
        await this.fetchData({
          url: `v1/profile/update/${userId}`,
          method: 'PATCH',
          data: this.formData
        });
        
        runInAction(() => {
          if (this.currentStep < steps.length - 1) {
            steps[this.currentStep].status = OnboardingStatus.completed;
            this.currentStep += 1;
            this.calculateProgress();
          }
        });
      } catch (error) {
        this.setErrors(error instanceof Error ? error : new Error('Failed to update profile'));
      } finally {
        runInAction(() => { 

        });
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
    const userId = this.formData.userId;
    const data = { ...this.formData, onboardingComplete: true };
    try {
      await this.patchData("v1/profile/update/" + userId, data);
      localStorage.removeItem("onboardingData");
      runInAction(() => {
        this.setIsOnboardingComplete(true);
      });
      return true;
    } catch (error) {
      this.setErrors(error instanceof Error ? error : new Error('Failed to update profile'));
      return false;
    }
  };
}