import { SkeletonLoader } from "@vuo/atoms/SkeletonLoader";
import { initialMealMap } from "@vuo/constants/Meals";
import { Meal } from "@vuo/models/Meals";
import { MealMapViewModel } from "@vuo/viewModels/MealMapViewModel";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import Page from "../templates/Page";
import styles from "./MealMap.module.scss";

const MealMap = observer(() => {
  const [viewModel] = useState<MealMapViewModel>(() => new MealMapViewModel());

  if (viewModel.isLoading) {
    return (
      <Page>
        {initialMealMap.map((dayPlan) => (
          <div className={styles.dayPlan} style={{ width: "100%" }}>
            <SkeletonLoader isLoading={viewModel.isLoading} variant="text">
              <h3>{dayPlan.date}</h3>
            </SkeletonLoader>

            <div className={styles.mealsGrid}>
              {dayPlan.meals.map((meal: Meal) => (
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
                    <img src={meal.image} alt={meal.name} />
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

        {/* <div className={styles.dayPlan} style={{ width: "100%" }}>
          <SkeletonLoader isLoading={viewModel.isLoading} variant="text">
            <h3>Teste</h3>
          </SkeletonLoader>
          <div className={styles.mealsGrid}>
            <div className={styles.mealBox}>
              <SkeletonLoader isLoading={viewModel.isLoading} variant="text">
                <strong>teste name</strong>
              </SkeletonLoader>
              <SkeletonLoader isLoading={viewModel.isLoading} variant="text">
                <img
                  src="https://recipemedia.fra1.cdn.digitaloceanspaces.com/KetoPictures/GarlicParmesanSpaghettiSquash_6672d8750a044e13c5133a30.webp"
                  alt="fake image"
                />
              </SkeletonLoader>
              <SkeletonLoader isLoading={viewModel.isLoading} variant="text">
                <p>teste description</p>
              </SkeletonLoader>
            </div>
            <div className={styles.mealBox}>
              <SkeletonLoader isLoading={viewModel.isLoading} variant="text">
                <strong>teste name</strong>
              </SkeletonLoader>
              <SkeletonLoader isLoading={viewModel.isLoading} variant="text">
                <img
                  src="https://recipemedia.fra1.cdn.digitaloceanspaces.com/KetoPictures/GarlicParmesanSpaghettiSquash_6672d8750a044e13c5133a30.webp"
                  alt="fake image"
                />
              </SkeletonLoader>
              <SkeletonLoader isLoading={viewModel.isLoading} variant="text">
                <p>teste description</p>
              </SkeletonLoader>
            </div>
            <div className={styles.mealBox}>
              <SkeletonLoader
                isLoading={viewModel.isLoading}
                variant="text"
                width="100%"
              >
                <strong>teste name</strong>
              </SkeletonLoader>
              <SkeletonLoader
                isLoading={viewModel.isLoading}
                variant="text"
                width="100%"
              >
                <img
                  src="https://recipemedia.fra1.cdn.digitaloceanspaces.com/KetoPictures/KetoCookieDoughBites_6672c32af6298d5adb6288d3.webp"
                  alt="fake image"
                />
              </SkeletonLoader>
              <SkeletonLoader
                isLoading={viewModel.isLoading}
                variant="text"
                width="100%"
              >
                <p>
                  teste descriptionteste descriptionteste descriptionteste
                  descriptionteste descriptionteste descriptionteste
                  descriptionteste descriptionteste descriptionteste
                  descriptionteste description
                </p>
              </SkeletonLoader>
            </div>
          </div>
        </div> */}
      </Page>
    );
  }

  if (viewModel.empty) {
    return (
      <Page>
        <div className={styles.empty}>
          <h3>No recipes found!!</h3>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      {viewModel.mealPlan.map((dayPlan) => (
        <div className={styles.dayPlan}>
          <h3>{dayPlan.date}</h3>

          <div className={styles.mealsGrid}>
            {dayPlan.meals.map((meal: Meal) => (
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
