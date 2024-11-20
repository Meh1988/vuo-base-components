import { MealMapMeal, MealStatus, MealTime } from "@vuo/models/Meals";
import Button from "@vuo/components/atoms/Button";
import { useState, forwardRef } from "react";
import styles from "./MealMapDay.module.scss";
import { CheckSVG, CloseSVG, PenSVG, PlusSVG, RefreshSVG } from "../atoms/SVGComponents";

interface MealMapDayProps {
    date: Date;
    meals: MealMapMeal[];
    onReselectMeal: (meal: MealMapMeal) => void;
    onConfirmMeal: (meal: MealMapMeal) => void;
    onDenyMeal: (meal: MealMapMeal) => void;
    onEditMeal: (meal: MealMapMeal) => void;
    onAddMeal: (mealDate: Date, mealTime: MealTime) => void;
}

const MealMapDay = forwardRef<HTMLDivElement, MealMapDayProps>(
    ({ date, meals, onReselectMeal, onConfirmMeal, onDenyMeal, onEditMeal, onAddMeal }: MealMapDayProps, ref) => {
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

        const [mealIndices, setMealIndices] = useState<Record<MealTime, number>>({
            [MealTime.Breakfast]: 0,
            [MealTime.Lunch]: 0,
            [MealTime.Dinner]: 0,
        });

        return <div className={styles.dayPlan} key={date.toDateString()} ref={ref}>

            <div className={styles.dayHeader}>
                <h3 className={styles.dayWeekday}>{weekday} <span className={styles.dayDate}>{date.toDateString() === new Date().toDateString() ? "Today" : ""}</span></h3>
                <p className={styles.dayDate}>{month} {day}</p>
            </div>

            <div className={styles.mealsGrid}>
                {Object.entries(mealsByType).map(([mealType, mealsList]) => {
                    const meal = mealsList?.[mealIndices[mealType as MealTime]];

                    return (
                        <div key={`${date.toDateString()}-${mealType}`} className={styles.mealBox}>
                            <h2 className={styles.mealType}>{mealType.toUpperCase()}</h2>

                            {/* Meal Pending Confirmation */}
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
                                            onClick={() => {
                                                onReselectMeal(meal);
                                                setMealIndices(prevIndices => ({
                                                    ...prevIndices,
                                                    [mealType]: prevIndices[mealType as MealTime] + 1
                                                }));
                                            }}
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

                            {/* Meal Confirmed */}
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

                                    <div className={styles.mealActions}>
                                        <div className={styles.mealStatus}>
                                            <span>Confirmed</span>
                                            <CheckSVG className={styles.checkIcon} />
                                        </div>

                                        <div className={styles.actionButtons}>
                                            <button
                                                type="button"
                                                className={styles.editButton}
                                                onClick={() => onEditMeal(meal)}
                                            >
                                                <PenSVG className={styles.penIcon} />
                                            </button>
                                        </div>
                                    </div>


                                </>
                            )}


                            {(!meal || meal.status === MealStatus.Denied) && (
                                <div className={styles.addMealButtonContainer}>
                                    <div className={styles.addMealButton} onClick={() => onAddMeal(date, mealType as MealTime)}>
                                        <PlusSVG className={styles.plusIcon} strokeWidth="4" />
                                        <p>Add {mealType}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>;
    }
);

export default MealMapDay;