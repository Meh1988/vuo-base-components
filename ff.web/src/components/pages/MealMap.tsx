import styles from "./MealMap.module.scss";
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { MealMapViewModel } from '@vuo/viewModels/MealMapViewModel';
import Page from "../templates/Page";

const MealMap = observer(() => {
    const [viewModel] = useState<MealMapViewModel>(
        () => new MealMapViewModel(),
    );

  if (viewModel.isLoading) {
    return <div>Loading...</div>;
  }

  if (viewModel.error) {
    return <div>Error: {viewModel.error}</div>;
  }

  return (
    <Page>
       {viewModel.mealPlan.map((dayPlan, index) => (
          <div key={index} className={styles.dayPlan}>
            <h3>{dayPlan.date}</h3>
            <div className={styles.mealsGrid}>
              {dayPlan.meals.map((meal: any) => (
                <div key={meal.id} className={styles.mealBox}>
                  <strong>{meal.name}</strong>
                  <img src={meal?.image} alt={meal.name} />
                  <p>{meal.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </Page>
  );
});

export default MealMap; 