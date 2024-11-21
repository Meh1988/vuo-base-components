import { SkeletonLoader } from "@vuo/atoms/SkeletonLoader";
import { initialMealMap } from "@vuo/constants/Meals";
import { MealMapViewModel } from "@vuo/viewModels/MealMapViewModel";
import { observer } from "mobx-react-lite";
import { useState, useEffect, useRef } from "react";
import MealMapWeekNav from "@vuo/components/organisms/MealMapWeekNav";
import MealMapDay from "@vuo/components/organisms/MealMapDay";
import { MealMapMeal } from "@vuo/models/Meals";
import Page from "../templates/Page";
import styles from "./MealMap.module.scss";

const MealMap = observer(() => {
  const WEEKLY_VIEW = false;
  const WEEK_STARTS_ON_MONDAY = true;

  const [viewModel] = useState<MealMapViewModel>(() => new MealMapViewModel());
  const todayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!viewModel.isLoading && todayRef.current) {
      setTimeout(() => {
        todayRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [viewModel.isLoading]);

  const renderMealMapDay = (date: Date, ref: React.RefObject<HTMLDivElement> | null = null) => {
    const dayPlan = viewModel.mealPlan.find(plan => {
      const planDate = new Date(plan.date);
      return planDate.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0);
    }) || null;
    const meals = dayPlan?.meals || [];

    return (
      <MealMapDay
        key={date.toDateString()}
        ref={ref}
        date={date}
        meals={meals}
        recommendedMeals={viewModel.recommendedMeals}
        onReselectMeal={(meal) => viewModel.reselectMeal(date, meal)}
        onConfirmMeal={(meal) => viewModel.confirmMeal(date, meal)}
        onDenyMeal={(meal) => viewModel.denyMeal(date, meal)}
        onEditMeal={(meal) => viewModel.editMeal(date, meal)}
        onAddMeal={(meal, mealTime) => viewModel.addMeal(meal, date, mealTime)}
      />
    );
  };

  if (viewModel.empty) {
    return (
      <Page>
        <div className={styles.empty}>
          <h3>No recipes found!!</h3>
        </div>
      </Page>
    );
  }

  if (viewModel.isLoading) {
    return (
      <Page>
        {initialMealMap.map((dayPlan) => (
          <div className={styles.dayPlan} style={{ width: "100%" }}>
            <SkeletonLoader isLoading={viewModel.isLoading} variant="text">
              <h3>{dayPlan.date}</h3>
            </SkeletonLoader>

            <div className={styles.mealsGrid}>
              {dayPlan.meals.map((meal: MealMapMeal) => (
                <div
                  key={meal.id}
                  className={styles.mealBox}
                  style={{ maxWidth: "100%" }}
                >
                  <SkeletonLoader
                    isLoading={viewModel.isLoading}
                    variant="text"
                    width="100%"
                  >
                    <strong>{meal.name}</strong>
                  </SkeletonLoader>
                  <SkeletonLoader
                    isLoading={viewModel.isLoading}
                    variant="text"
                    width="100%"
                  >
                    <img src={meal.media?.image} alt={meal.name} />
                  </SkeletonLoader>
                  <SkeletonLoader
                    isLoading={viewModel.isLoading}
                    variant="text"
                    width="100%"
                  >
                    <p>{meal.description}</p>
                  </SkeletonLoader>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Page>
    );
  }

  if (WEEKLY_VIEW) {
    return (
      <Page>
        <MealMapWeekNav
          currentDay={new Date()}
          currentWeekIndex={viewModel.currentWeekIndex}
          startingOnMonday={WEEK_STARTS_ON_MONDAY}
          onWeekChange={(weekIndex) => viewModel.setCurrentWeekIndex(weekIndex)}
        />
        {Array.from({ length: 7 }, (_, index) => {
          const currentDate = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);
          const daysToAdd = ((viewModel.currentWeekIndex - 1) * 7) +
            (WEEK_STARTS_ON_MONDAY ? index : (index - 1) % 7);
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + daysToAdd);
          return renderMealMapDay(date);
        })}
      </Page>
    );
  }

  // Daily view: 2 days before + today + 14 days ahead
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
  const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
  const days = [];

  for (let date = new Date(startDate); date <= endDate; date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)) {
    days.push(renderMealMapDay(
      date,
      date.getTime() === today.getTime() ? todayRef : null
    ));
  }

  return (
    <Page className={styles.scrollContainer}>
      {days}
    </Page>
  );
});

export default MealMap;
