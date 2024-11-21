import Modal from "@vuo/components/atoms/Modal";
import { MealMapMeal, MealTime } from "@vuo/models/Meals";
import styles from "./AddMealModal.module.scss";

interface AddMealModalProps {
    open: boolean;
    onClose: () => void;
    mealTime: MealTime;
    meals: MealMapMeal[];
    onAddMeal: (meal: MealMapMeal, mealTime: MealTime) => void;
}

const AddMealModal = ({ open, onClose, mealTime, meals, onAddMeal }: AddMealModalProps) => (
    <Modal open={open} onClose={onClose} title={`Add ${mealTime}`}>
        <div className={styles.mealsContainer}>
            {meals.map(meal => (
                <button 
                    key={meal.id} 
                    type="button" 
                    className={styles.mealCard}
                    onClick={() => onAddMeal(meal, mealTime)}
                >
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
                </button>
            ))}
        </div>
    </Modal>
);

export default AddMealModal;

