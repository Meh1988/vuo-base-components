import { MealMapMeal, MealTime } from "@vuo/models/Meals";
import Button from "@vuo/components/atoms/Button";
import styles from "./MealMapDay.module.scss";

function MealMapDay({ formattedDate, meals }: { formattedDate: string, meals: MealMapMeal[] }) {
    // Sort meals into slots
    const mealsByType = {
        Breakfast: meals.find(m => m.time === MealTime.Breakfast),
        Lunch: meals.find(m => m.time === MealTime.Lunch),
        Dinner: meals.find(m => m.time === MealTime.Dinner)
    };

    return <div className={styles.dayPlan} key={formattedDate}>
        <h3>{formattedDate}</h3>

        <div className={styles.mealsGrid}>
            {Object.entries(mealsByType).map(([mealType, meal]) => (
                <div key={`${formattedDate}-${mealType}`} className={styles.mealBox}>
                    <h2 className={styles.mealType}>{mealType.toUpperCase()}</h2>

                    {meal && (
                        <>
                            <div className={styles.mealImageContainer}>
                                {meal.media?.image && (
                                    <img
                                        src={meal.media.image}
                                        alt={meal.name}
                                        className={styles.mealImage}
                                    />
                                )}
                            </div>

                            <h3 className={styles.mealName}>{meal.name}</h3>

                            <div className={styles.actionButtons}>
                                <Button className={styles.confirmButton}>Confirm</Button>
                                <Button className={styles.cycleButton}>
                                    <span className={styles.refreshIcon}>↻</span>
                                </Button>
                                <Button className={styles.cancelButton}>
                                    <span className={styles.closeIcon}>×</span>
                                </Button>
                            </div>
                        </>
                    )}

                    {!meal && <p className={styles.emptyState}>No {mealType} planned</p>}
                </div>
            ))}
        </div>
    </div>;
}

export default MealMapDay;