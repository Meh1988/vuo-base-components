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
          const currentDate = new Date(new Date().getFullYear(), 0, 1);
          const daysToAdd = ((viewModel.currentWeekIndex - 1) * 7) +
            (WEEK_STARTS_ON_MONDAY ? index : (index - 1) % 7);

          currentDate.setDate(currentDate.getDate() + daysToAdd);

          // Find the meal plan for this day
          const dayPlan = viewModel.mealPlan.find(plan => {
            const planDate = new Date(plan.date);
            const isMatchingDate = planDate.toDateString() === currentDate.toDateString();
            return isMatchingDate;
          }) || null;
          const meals = dayPlan?.meals || [];

          return (
            <MealMapDay
              key={currentDate.toDateString()}
              ref={null}
              date={currentDate}
              meals={meals}
              onReselectMeal={(meal) => viewModel.reselectMeal(meal)}
              onConfirmMeal={(meal) => viewModel.confirmMeal(meal)}
              onDenyMeal={(meal) => viewModel.denyMeal(meal)}
              onEditMeal={(meal) => viewModel.editMeal(meal)}
              onAddMeal={(mealDate, mealTime) => console.log("mealDate", mealDate, "mealTime", mealTime)}
            />
          );
        })}
      </Page>
    );
  }
  if (!WEEKLY_VIEW) {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 2);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 14);

    const days = [];

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const dayPlan = viewModel.mealPlan.find(plan => {
        const planDate = new Date(plan.date);
        return planDate.toDateString() === date.toDateString();
      }) || null;
      const meals = dayPlan?.meals || [];

      days.push(
        <MealMapDay
          key={date.toDateString()}
          ref={date.toDateString() === today.toDateString() ? todayRef : null}
          date={new Date(date)}
          meals={meals}
          onReselectMeal={(meal) => viewModel.reselectMeal(meal)}
          onConfirmMeal={(meal) => viewModel.confirmMeal(meal)}
          onDenyMeal={(meal) => viewModel.denyMeal(meal)}
          onEditMeal={(meal) => viewModel.editMeal(meal)}
          onAddMeal={(mealDate, mealTime) => console.log("mealDate", mealDate, "mealTime", mealTime)}
        />
      );
    }

    return (
      <Page className={styles.scrollContainer}>
        {days}
      </Page>
    );
  }

  return null;
});

export default MealMap;
