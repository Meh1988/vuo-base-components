import { MealMapMeal, MealStatus, MealTime } from "@vuo/models/Meals";
import Button from "@vuo/components/atoms/Button";
import { useState, forwardRef } from "react";
import styles from "./MealMapDay.module.scss";
import { CheckSVG, CloseSVG, PenSVG, PlusSVG, RefreshSVG } from "../atoms/SVGComponents";
import AddMealModal from "../molecules/AddMealModal";

interface MealMapDayProps {
    date: Date;
    meals: MealMapMeal[];
    recommendedMeals: MealMapMeal[];
    onReselectMeal: (meal: MealMapMeal) => void;
    onConfirmMeal: (meal: MealMapMeal) => void;
    onDenyMeal: (meal: MealMapMeal) => void;
    onEditMeal: (meal: MealMapMeal) => void;
    onAddMeal: (meal: MealMapMeal, mealTime: MealTime) => void;
}

const MealMapDay = forwardRef<HTMLDivElement, MealMapDayProps>(
    ({ date, meals, recommendedMeals, onReselectMeal, onConfirmMeal, onDenyMeal, onEditMeal, onAddMeal }: MealMapDayProps, ref) => {
        const [addMealModalOpen, setAddMealModalOpen] = useState(false);
        const [mealTime, setMealTime] = useState<MealTime>(MealTime.Breakfast);

        // Sort meals into slots
        const mealsByType: Record<MealTime, MealMapMeal[] | undefined> = {
            Breakfast: meals.filter(m => m.time === MealTime.Breakfast),
            Lunch: meals.filter(m => m.time === MealTime.Lunch),
            Dinner: meals.filter(m => m.time === MealTime.Dinner)
        };

        const weekday = date.toLocaleDateString('en-US', {
            weekday: 'long',
        });

        const month = date.toLocaleDateString('en-US', {
            month: 'short',
        });

        const day = date.toLocaleDateString('en-US', {
            day: 'numeric',
        });

        return <div className={styles.dayPlan} key={date.toDateString()} ref={ref}>

            <div className={styles.dayHeader}>
                <h3 className={styles.dayWeekday}>{weekday} <span className={styles.dayDate}>{date.toDateString() === new Date().toDateString() ? "Today" : ""}</span></h3>
                <p className={styles.dayDate}>{month} {day}</p>
            </div>

            <div className={styles.mealsGrid}>
                {Object.entries(mealsByType).map(([mealType, mealsList]) => {
                    const meal = mealsList?.find(m => m.status !== MealStatus.Refreshed && m.status !== MealStatus.Denied);

                    return (
                        <div key={`${date.toDateString()}-${mealType}`} className={styles.mealBox}>
                            <h2 className={styles.mealType}>{mealType.toUpperCase()}</h2>

                            {meal && meal.status === MealStatus.Pending && (
                                <>
                                    <div className={styles.mealInfoContainer}>
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
                                    </div>

                                    <div className={styles.actionButtons}>
                                        <Button className={styles.confirmButton} onClick={() => onConfirmMeal(meal)}>Confirm</Button>
                                        <button
                                            type="button"
                                            className={styles.cycleButton}
                                            onClick={() => onReselectMeal(meal)}
                                        >
                                            <RefreshSVG className={styles.refreshIcon} />
                                        </button>
                                        <button
                                            type="button"
                                            className={styles.cancelButton}
                                            onClick={() => onDenyMeal(meal)}
                                        >
                                            <CloseSVG className={styles.closeIcon} />
                                        </button>
                                    </div>
                                </>
                            )}

                            {meal && meal.status === MealStatus.Confirmed && (
                                <>
                                    <div className={styles.mealInfoContainer}>
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
                                    </div>

                                    <div className={styles.actionButtons}>
                                        <div className={styles.mealStatus}>
                                            <span>Confirmed</span>
                                            <CheckSVG className={styles.checkIcon} />
                                        </div>

                                        <button
                                            type="button"
                                            className={styles.editButton}
                                            onClick={() => onEditMeal(meal)}
                                        >
                                            <PenSVG className={styles.penIcon} />
                                        </button>
                                    </div>


                                </>
                            )}

                            {(!meal || meal.status === MealStatus.Denied) && (
                                <div className={styles.addMealButtonContainer}>
                                    <div className={styles.addMealButton} onClick={() => {
                                        setAddMealModalOpen(true);
                                        setMealTime(mealType as MealTime);
                                    }}>
                                        <PlusSVG className={styles.plusIcon} strokeWidth="4" />
                                        <p>Add {mealType}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {addMealModalOpen && (
                <AddMealModal
                    open={addMealModalOpen}
                    onClose={() => setAddMealModalOpen(false)}
                    mealTime={mealTime}
                    meals={[...recommendedMeals.filter(meal => meal.status !== MealStatus.Denied)]}
                    onAddMeal={(meal) => {
                        onAddMeal(meal, mealTime);
                        setAddMealModalOpen(false);
                    }}
                />
            )}
        </div>;
    }
);

export default MealMapDay;