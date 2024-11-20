import { cacheService } from "@services/CacheService";
import { action, makeObservable, observable, runInAction } from "mobx";
import { DayPlan, MealMapMeal, MealStatus, MealTime } from "@vuo/models/Meals";
import { BaseViewModel } from "./BaseViewModel";



export class MealMapViewModel extends BaseViewModel {
  static CACHE_KEY = "mealMapRecipes"; // cache key for recipes

  recipes: MealMapMeal[] = [];
  mealPlan: DayPlan[] = [];
  recommendedMeals: MealMapMeal[] = [];
  isLoading = false;
  error: string | null = null;
  empty = false;
  currentWeekIndex: number;
  constructor() {
    super();
    makeObservable(this, {
      recipes: observable,
      mealPlan: observable,
      recommendedMeals: observable,
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
      addMeal: action,
    });

    this.currentWeekIndex = MealMapViewModel.calculateCurrentWeekIndex(new Date());

    // Automatically fetch recipes when instance is created
    this.fetchRecipes();
    this.fetchRecommendedMeals();
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

  reselectMeal(date: Date, meal: MealMapMeal) {
    console.log('Reselecting meal', JSON.stringify(meal, null, 2));
    console.log('Date', date.toDateString());
    // Find the day plan containing this meal
    const dayPlan = this.mealPlan.find(plan =>
      plan.date.toDateString() === date.toDateString() && plan.meals.some(m => m.id === meal.id)
    );

    if (!dayPlan) {
      console.log('Day plan not found');
      return;
    }

    // Find the meal within that day's meals
    const mealIndex = dayPlan.meals.findIndex(m => m.id === meal.id);
    if (mealIndex === -1) {
      console.log('Meal not found');
      return;
    }

    // Create a new array to trigger MobX reactivity
    dayPlan.meals = dayPlan.meals.map(m =>
      m.id === meal.id ? { ...m, status: MealStatus.Refreshed } : m
    );

    console.log('Day plan', JSON.stringify(dayPlan, null, 2));

    // Check if all the meals in the same mealTime of the day are refreshed
    const allRefreshed = dayPlan.meals.filter(m => m.time === meal.time).every(m => m.status === MealStatus.Refreshed);
    if (allRefreshed) {
      // TODO: make it do something xd, for now just treat as if denied

    }
  }

  confirmMeal(date: Date, meal: MealMapMeal) {
    // Find the day plan containing this meal
    const dayPlan = this.mealPlan.find(plan =>
      plan.date.toDateString() === date.toDateString() && plan.meals.some(m => m.id === meal.id)
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

  denyMeal(date: Date, meal: MealMapMeal) {
    const dayPlan = this.mealPlan.find(plan =>
      plan.date.toDateString() === date.toDateString() && plan.meals.some(m => m.id === meal.id && m.time === meal.time)
    );

    if (!dayPlan) {
      return;
    }

    // Change the status of the other meals at the same time to refreshed
    dayPlan.meals = dayPlan.meals.map(m =>
      m.time === meal.time && m.status !== MealStatus.Denied ? { ...m, status: MealStatus.Refreshed } : m
    );

    // Only change the status of the specific meal at the specific time
    dayPlan.meals = dayPlan.meals.map(m =>
      m.id === meal.id && m.time === meal.time ? { ...m, status: MealStatus.Denied } : m
    );
  }

  editMeal(date: Date, meal: MealMapMeal) {
    // Find the day plan containing this meal
    const dayPlan = this.mealPlan.find(plan =>
      plan.date.toDateString() === date.toDateString() && plan.meals.some(m => m.id === meal.id)
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

  addMeal(meal: MealMapMeal, mealDate: Date, mealTime: MealTime) {
    runInAction(() => {
      let dayPlan = this.mealPlan.find(plan => plan.date.toDateString() === mealDate.toDateString());

      if (!dayPlan) {
        // Create new day plan if it doesn't exist
        dayPlan = {
          date: mealDate,
          meals: []
        };
        // Create a new array reference for mealPlan to ensure reactivity
        this.mealPlan = [...this.mealPlan, dayPlan];
      }

      // Find the dayPlan again from the updated array
      const updatedDayPlan = this.mealPlan.find(plan => plan.date.toDateString() === mealDate.toDateString());
      if (updatedDayPlan) {
        // Create new array reference for meals
        updatedDayPlan.meals = [{ ...meal, time: mealTime, status: MealStatus.Pending }, ...updatedDayPlan.meals];
      }
    });
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

  async fetchRecommendedMeals(): Promise<void> {
    const data = await this.fetchData<MealMapMeal[]>({
      url: "v1/mealmap/recipes",
      method: "GET",
    });

    const recommendedMeals = data?.map((recipe, index) => ({
      id: recipe.id,
      name: recipe.name || `Meal ${index + 1}`,
      description: recipe.description || `Description for Meal ${index + 1}`,
      media: { image: recipe?.media?.image },
      time: MealTime.Breakfast,
      status: MealStatus.Pending,
    })) || [];

    runInAction(() => {
      this.recommendedMeals = recommendedMeals;
    });

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