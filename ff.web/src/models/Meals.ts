export interface DayPlan {
  date: string;
  meals: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  image?: string;
}
