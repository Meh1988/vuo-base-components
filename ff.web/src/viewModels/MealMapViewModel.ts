import { makeObservable, observable, action, runInAction } from 'mobx';
import { BaseViewModel } from './BaseViewModel';

interface Recipe {
  _id: string;
  name: string;
  description: string;
  media?: {
    image?: string;
  };
}

interface DayPlan {
  date: string;
  meals: {
    id: string;
    name: string;
    description: string;
    image?: string;
  }[];
}

export class MealMapViewModel extends BaseViewModel {
  recipes: Recipe[] = [];
  mealPlan: DayPlan[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    super();
    makeObservable(this, {
      recipes: observable,
      mealPlan: observable,
      isLoading: observable,
      error: observable,
      fetchRecipes: action
    });
    
    // Automatically fetch recipes when instance is created
    this.fetchRecipes();
  }

  async fetchRecipes(): Promise<void> {
    this.isLoading = true; // Add loading state
    
    const data = await this.fetchData<Recipe[]>({url: "v1/mealmap/recipes", method: "GET"});
    runInAction(() => {
        this.recipes = data || [];
        this.mealPlan = this.organizeMeals(data || []);
        this.isLoading = false;
    });
  }
  private organizeMeals(recipes: Recipe[]): DayPlan[] {
    const mealPlan: DayPlan[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);

    for (let day = 0; day < 14; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + day);

      const meals = recipes.slice(day * 3, day * 3 + 3).map((recipe, index) => ({
        id: recipe._id,
        name: recipe.name || `Meal ${index + 1}`,
        description: recipe.description || `Description for Meal ${index + 1}`,
        image: recipe?.media?.image,
      }));

      mealPlan.push({
        date: currentDate.toDateString(),
        meals,
      });
    }

    return mealPlan;
  }
} 