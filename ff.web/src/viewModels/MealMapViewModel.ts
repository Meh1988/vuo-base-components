import { cacheService } from "@services/CacheService";
import { action, makeObservable, observable, runInAction } from "mobx";
import { BaseViewModel } from "./BaseViewModel";

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
  static CACHE_KEY = "mealMapRecipes"; // cache key for recipes

  recipes: Recipe[] = [];
  mealPlan: DayPlan[] = [];
  isLoading = false;
  error: string | null = null;
  empty = false;

  constructor() {
    super();
    makeObservable(this, {
      recipes: observable,
      mealPlan: observable,
      isLoading: observable,
      error: observable,
      empty: observable,
      fetchRecipes: action,
    });

    this.fetchRecipes();
  }

  async fetchRecipes(): Promise<void> {
    this.isLoading = true; // Add loading state
    const cachedData = cacheService.get<Recipe[]>(MealMapViewModel.CACHE_KEY);

    if (cachedData) {
      runInAction(() => {
        this.recipes = cachedData;
        this.mealPlan = this.organizeMeals(cachedData);
        this.isLoading = false;
        this.empty = cachedData.length === 0;
      });
    } else {
      try {
        const data = await this.fetchData<Recipe[]>({
          url: "v1/mealmap/recipes",
          method: "GET",
        });

        runInAction(() => {
          this.recipes = data || [];
          this.mealPlan = this.organizeMeals(data || []);
          this.isLoading = false;
          this.empty = data?.length === 0 || !data;

          cacheService.set<Recipe[] | null>(MealMapViewModel.CACHE_KEY, data); // Cache the fetched data
        });
      } catch (err) {
        runInAction(() => {
          this.error = "Failed to fetch recipes.";
          this.isLoading = false;
        });
      }
    }
  }

  private organizeMeals(recipes: Recipe[]): DayPlan[] {
    if (!this.recipes) {
      return [];
    }
    const mealPlan: DayPlan[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);

    for (let day = 0; day < 14; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + day);

      const meals = recipes
        .slice(day * 3, day * 3 + 3)
        .map((recipe, index) => ({
          id: recipe._id,
          name: recipe.name || `Meal ${index + 1}`,
          description:
            recipe.description || `Description for Meal ${index + 1}`,
          image: recipe?.media?.image,
        }));

      if (meals.length !== 0) {
        mealPlan.push({
          date: currentDate.toDateString(),
          meals,
        });
      }
    }

    return mealPlan;
  }
}
