import { cacheService } from "@services/CacheService";
import { action, makeObservable, observable, runInAction } from "mobx";
import { DayPlan, MealMapMeal, MealStatus, MealTime } from "@vuo/models/Meals";
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
      reselectMeal: action,
      confirmMeal: action,
      denyMeal: action,
      editMeal: action,
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

  reselectMeal(meal: MealMapMeal) {
    // Find the day plan containing this meal
    const dayPlan = this.mealPlan.find(plan =>
      plan.meals.some(m => m.id === meal.id)
    );

    if (!dayPlan) {
      return;
    }

    // Find the meal within that day's meals
    const mealIndex = dayPlan.meals.findIndex(m => m.id === meal.id);
    if (mealIndex === -1) {
      return;
    }

    // Update the meal's status to refreshed
    dayPlan.meals[mealIndex].status = MealStatus.Refreshed;

    // Check if all the meals in the same mealTime of the day are refreshed
    const allRefreshed = dayPlan.meals.filter(m => m.time === meal.time).every(m => m.status === MealStatus.Refreshed);
    if (allRefreshed) {
      // TODO: make it do something xd, for now just treat as if denied
      this.denyMeal(meal);
    }
  }

  confirmMeal(meal: MealMapMeal) {
    // Find the day plan containing this meal
    const dayPlan = this.mealPlan.find(plan =>
      plan.meals.some(m => m.id === meal.id)
    );

    if (!dayPlan) {
      return;
    }

    // Find the meal within that day's meals
    const mealIndex = dayPlan.meals.findIndex(m => m.id === meal.id);
    if (mealIndex === -1) {
      return;
    }

    // Create a new array to trigger MobX reactivity
    dayPlan.meals = dayPlan.meals.map((m, index) => 
      index === mealIndex ? { ...m, status: MealStatus.Confirmed } : m
    );
  }

  denyMeal(meal: MealMapMeal) {
    // Find the day plan containing this meal
    const dayPlan = this.mealPlan.find(plan =>
      plan.meals.some(m => m.id === meal.id)
    );

    if (!dayPlan) {
      return;
    }

    // Make all meals that have the same time as the denied meal to denied
    // This efectively hides the meals for that time
    dayPlan.meals = dayPlan.meals.map(m => ({
      ...m,
      status: m.time === meal.time ? MealStatus.Denied : m.status
    }));
  }

  editMeal(meal: MealMapMeal) {
    // Find the day plan containing this meal
    const dayPlan = this.mealPlan.find(plan =>
        plan.meals.some(m => m.id === meal.id)
    );

    if (!dayPlan) {
        return;
    }

    // Find the meal within that day's meals
    const mealIndex = dayPlan.meals.findIndex(m => m.id === meal.id);
    if (mealIndex === -1) {
        return;
    }

    // Create a new array to trigger MobX reactivity
    dayPlan.meals = dayPlan.meals.map((m, index) => 
        index === mealIndex ? { ...m, status: MealStatus.Pending } : m
    );
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
        .slice(day * 9, day * 9 + 9)
        .map((recipe, index) => ({
          id: recipe.id,
          name: recipe.name || `Meal ${index + 1}`,
          description:
            recipe.description || `Description for Meal ${index + 1}`,
          media: { image: recipe?.media?.image },
          time: [
            MealTime.Breakfast, MealTime.Breakfast, MealTime.Breakfast,
            MealTime.Lunch, MealTime.Lunch, MealTime.Lunch,
            MealTime.Dinner, MealTime.Dinner, MealTime.Dinner
          ][index % 9],
          status: MealStatus.Pending,
        }));

      if (meals.length !== 0) {
        mealPlan.push({
          date: currentDate,
          meals
        });
      }
    }

    return mealPlan;
  }
}