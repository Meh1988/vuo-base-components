import { SkeletonLoader } from "@vuo/atoms/SkeletonLoader";
import { initialMealMap } from "@vuo/constants/Meals";
import { MealMapViewModel } from "@vuo/viewModels/MealMapViewModel";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import MealMapWeekNav from "@vuo/components/organisms/MealMapWeekNav";
import MealMapDay from "@vuo/components/organisms/MealMapDay";
import { MealMapMeal } from "@vuo/models/Meals";
import Page from "../templates/Page";
import styles from "./MealMap.module.scss";

const MealMap = observer(() => {
  const WEEK_STARTS_ON_MONDAY = true;

  const [viewModel] = useState<MealMapViewModel>(() => new MealMapViewModel());

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

  console.log(JSON.stringify(viewModel.mealPlan, null, 2));
  
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
        
        const formattedDate = currentDate.toLocaleDateString('en-US', { 
          weekday: 'long',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });

        const dayPlan = viewModel.mealPlan[index];
        const meals = dayPlan && new Date(dayPlan.date).toDateString() === currentDate.toDateString() 
          ? dayPlan.meals 
          : [];

        return (
          <MealMapDay 
            formattedDate={formattedDate} 
            meals={meals}
          />
        );
      })}
    </Page>
  );
});

export default MealMap;
