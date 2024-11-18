import { cacheService } from "@services/CacheService";
import { action, makeObservable, observable, runInAction } from "mobx";
import { DayPlan, MealMapMeal, MealTime } from "@vuo/models/Meals";
import { BaseViewModel } from "./BaseViewModel";



export class MealMapViewModel extends BaseViewModel {
  static CACHE_KEY = "mealMapRecipes"; // cache key for recipes

  recipes: MealMapMeal[] = [];
  mealPlan: DayPlan[] = [];
  isLoading = false;
  error: string | null = null;
  empty = false;
  currentWeekIndex: number;

  constructor() {
    super();
    makeObservable(this, {
      recipes: observable,
      mealPlan: observable,
      isLoading: observable,
      error: observable,
      empty: observable,
      fetchRecipes: action,
      currentWeekIndex: observable,
      setCurrentWeekIndex: action,
    });

    this.currentWeekIndex = MealMapViewModel.calculateCurrentWeekIndex(new Date());

    // Automatically fetch recipes when instance is created
    this.fetchRecipes();
  }

  private static calculateCurrentWeekIndex(currentDay: Date): number {
    const startOfYear = new Date(currentDay.getFullYear(), 0, 1);
    const diff = currentDay.getTime() - startOfYear.getTime();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    return Math.floor(diff / oneWeek) + 1;
  }

  setCurrentWeekIndex(weekIndex: number) {
    this.currentWeekIndex = weekIndex;
  }

  async fetchRecipes(): Promise<void> {
    this.isLoading = true; // Add loading state
    const cachedData = cacheService.get<MealMapMeal[]>(MealMapViewModel.CACHE_KEY);

    if (cachedData) {
      runInAction(() => {
        this.recipes = cachedData;
        this.mealPlan = this.organizeMeals(cachedData);
        this.isLoading = false;
        this.empty = cachedData.length === 0;
      });
    } else {
      try {
        const data = await this.fetchData<MealMapMeal[]>({
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

  private organizeMeals(recipes: MealMapMeal[]): DayPlan[] {
    if (!this.recipes) {
      return [];
    }
    const mealPlan: DayPlan[] = [];
    const startDate = new Date();

    for (let day = 0; day < 14; day += 1) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + day);

      const meals = recipes
        .slice(day * 3, day * 3 + 3)
        .map((recipe, index) => ({
          id: recipe.id,
          name: recipe.name || `Meal ${index + 1}`,
          description:
            recipe.description || `Description for Meal ${index + 1}`,
          media: { image: recipe?.media?.image },
          time: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner][index % 3],
        }));

      if (meals.length !== 0) {
        mealPlan.push({
          date: currentDate,
          meals,
        });
      }
    }

    return mealPlan;
  }
}
