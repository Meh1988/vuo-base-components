export interface DayPlan {
  date: Date;
  meals: MealMapMeal[];
}

export interface MealMapMeal {
  id: string;
  name: string;
  description: string;
  media?: {
    image?: string;
  };
  time: MealTime;
  status: MealStatus;
}

export enum MealStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Refreshed = "refreshed",
  Denied = "denied",
}

export enum MealTime {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner",
}