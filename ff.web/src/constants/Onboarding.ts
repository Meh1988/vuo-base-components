import { OnboardingStatus } from "@vuo/models/Onboarding";

export const allergies = [
  "Shellfish",
  "Fish",
  "Dairy",
  "Peanut",
  "Tree nut",
  "Egg",
  "Gluten",
  "Soy",
  "Sesame",
];

export const commonDislikes = [
  "beef",
  "beets",
  "bell peppers",
  "broccoli",
  "brussels sprouts",
  "cilantro",
  "eggplant",
  "eggs",
  "fish",
  "ginger",
  "kale",
  "mayonnaise",
  "mushrooms",
  "okra",
  "olives",
  "peas",
];

export const cuisines = [
  "American",
  "Italian",
  "Mexican",
  "Asian",
  "Chinese",
  "Japanese",
  "Thai",
  "Indian",
];

export const initialOnboardingData = {
  goals: [],
  sex: "",
  age: "",
  userId: "",
  userName: "",
  height: "",
  currentWeight: "",
  goalWeight: "",
  motivation: "",
  activityLevel: "",
  mindset: "",
  speed: "moderate",
  dietPlan: "",
  pastExperience: "",
  format: "",
  allergies: [],
  dislikes: [],
  cuisinePreferences: {},
  pantry: "",
  cookingSkills: "",
};

export const steps = [
  {
    id: "intro",
    title: "Your meal plan awaits",
    description:
      "We'll learn about your goals and preferences to help build your first custom meal plan.",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "userName",
    title: "Your name",
    description: "What should we call you?",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "userId",
    title: "Your user ID",
    description:
      "This is your unique user ID. It will be used to identify you in our system.",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "sex",
    title: "About you",
    description:
      "What is your sex? We'll use this to estimate your daily energy needs.",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "age",
    title: "Age",
    description: "How old are you?",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "height",
    description: "How tall are you?",
    title: "Height",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "current-weight",
    title: "Current weight",
    description: "How much do you currently weigh?",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "goal-weight",
    title: "Goal weight",
    description: "What is your goal weight?",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "goals",
    title: "Your goals",
    description:
      "What can we help you accomplish? We'll personalize our recommendations based on your goals.",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "motivation",
    title: "Motivation",
    description: "How motivated are you to make changes to your diet?",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "activity",
    title: "Activity level",
    description: "How often do you exercise?",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "mindset",
    title: "Your mindset",
    description:
      "How do you relate to the statement: 'I know what I should be doing to eat healthy, but I need to find a way to do it that fits into my life'?",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "speed",
    title: "Speed",
    description:
      "Based on your information, we recommend a moderate pace, but feel free to adjust!",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "diet-plan",
    title: "Diet plan",
    description:
      "We'll start with a 1 week custom plan to help you gain weight. Which plan best suits your preferences?",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "past-experience",
    title: "Past experience",
    description:
      "What best describes your experience with changing the way you eat?",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "format",
    title: "Format",
    description:
      "What meals would you like to plan? You can adjust this if you change your mind later!",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "allergies",
    title: "Allergies",
    description: "Do you have any food allergies or restrictions?",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "dislikes",
    title: "Dislikes",
    description: "Are there any foods you dislike?",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "cuisines",
    title: "Cuisines",
    description: "Are there any cuisines you especially like or dislike?",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "pantry",
    title: "Your pantry",
    description: "How well-stocked is your kitchen right now?",
    status: OnboardingStatus.notStarted,
  },
  {
    id: "cooking-skills",
    title: "Cooking skills",
    description: "How would you describe your cooking skills?",
    status: OnboardingStatus.notStarted,
  },
];
