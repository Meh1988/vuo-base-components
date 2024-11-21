export enum OnboardingStatus {
  notStarted = "notStarted",
  inProgress = "inProgress",
  completed = "completed",
}

export interface FormData {
  goals: string[];
  allergies: string[];
  likes: string[];
  dislikes: string[];
  favouriteIngredients: string[];
  diets: string[];
  userName: string;
  userId: string;
  description: string;
  sex: string;
  age: string;
  height: string;
  currentWeight: string;
  goalWeight: string;
  motivation: string;
  activityLevel: string;
  mindset: string;
  dietPlan: string;
  pastExperience: string;
  format: string;
  pantry: string;
  cookingSkills: string;
  cuisinePreferences: {
    [key: string]: "like" | "dislike" | null;
  };
  image: string;
  onboardingStatus: OnboardingStatus;
}
