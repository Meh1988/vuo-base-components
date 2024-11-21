import { FormData, OnboardingStatus } from "@models/Onboarding";

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

export const favouriteIngredients = [
  "garlic",
  "cilantro",
  "onion",
  "tomatoe",
  "olive oil",
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

export const initialOnboardingData: FormData = {
  goals: [],
  sex: "",
  age: "",
  userId: "-",
  likes: [],
  userName: "",
  diets: [],
  description: "",
  height: "",
  currentWeight: "",
  goalWeight: "",
  motivation: "",
  activityLevel: "",
  mindset: "",
  dietPlan: "",
  pastExperience: "",
  format: "",
  allergies: [],
  favouriteIngredients: [],
  dislikes: [],
  cuisinePreferences: {},
  pantry: "",
  cookingSkills: "",
  image: "",
  onboardingStatus: OnboardingStatus.notStarted,
};

export const steps = [
  {
    id: "intro",
    title: "Your meal plan awaits",
    description:
      "We'll learn about your goals and preferences to help build your first custom meal plan.",
    
  },
  {
    id: "userName",
    title: "Your name",
    description: "What should we call you?",
    
  },
  // {
  //   id: "userId",
  //   title: "Your user ID",
  //   description:
  //     "This is your unique user ID. It will be used to identify you in our system.",
  //   
  // },
  // {
  //   id: "description",
  //   title: "Your description",
  //   description:
  //     "Tell us a bit about yourself. This will help us personalize your meal plan.",
  //   
  // },
  {
    id: "sex",
    title: "About you",
    description:
      "What is your sex? We'll use this to estimate your daily energy needs.",
    
  },
  {
    id: "age",
    title: "Age",
    description: "How old are you?",
    
  },
  {
    id: "height",
    description: "How tall are you?",
    title: "Height",
    
  },
  {
    id: "current-weight",
    title: "Current weight",
    description: "How much do you currently weigh?",
    
  },
  {
    id: "goal-weight",
    title: "Goal weight",
    description: "What is your goal weight?",
    
  },
  {
    id: "goals",
    title: "Your goals",
    description:
      "What can we help you accomplish? We'll personalize our recommendations based on your goals.",
    
  },
  {
    id: "motivation",
    title: "Motivation",
    description: "How motivated are you to make changes to your diet?",
    
  },
  {
    id: "activity",
    title: "Activity level",
    description: "How often do you exercise?",
    
  },
  {
    id: "mindset",
    title: "Your mindset",
    description:
      "How do you relate to the statement: 'I know what I should be doing to eat healthy, but I need to find a way to do it that fits into my life'?",
    
  },
  {
    id: "diet-plan",
    title: "Diet plan",
    description:
      "We'll start with a 1 week custom plan to help you gain weight. Which plan best suits your preferences?",
    
  },
  {
    id: "past-experience",
    title: "Past experience",
    description:
      "What best describes your experience with changing the way you eat?",
    
  },
  {
    id: "format",
    title: "Format",
    description:
      "What meals would you like to plan? You can adjust this if you change your mind later!",
    
  },
  {
    id: "favourite-ingredients",
    title: "Favourite ingredients",
    description: "What are your favourite ingredients?",
    
  },
  {
    id: "allergies",
    title: "Allergies",
    description: "Do you have any food allergies or restrictions?",
    
  },
  {
    id: "dislikes",
    title: "Dislikes",
    description: "Are there any foods you dislike?",
    
  },
  {
    id: "cuisines",
    title: "Cuisines",
    description: "Are there any cuisines you especially like or dislike?",
    
  },
  {
    id: "pantry",
    title: "Your pantry",
    description: "How well-stocked is your kitchen right now?",
    
  },
  {
    id: "cooking-skills",
    title: "Cooking skills",
    description: "How would you describe your cooking skills?",
    
  },
];
