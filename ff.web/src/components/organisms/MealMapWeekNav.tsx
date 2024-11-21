import styles from "./MealMapWeekNav.module.scss";
import { ChevronSVG } from "../atoms/SVGComponents";

interface MealMapWeekNavProps {
    currentDay: Date;
    currentWeekIndex: number;
    startingOnMonday: boolean;
    onWeekChange: (weekIndex: number) => void;
}

function MealMapWeekNav({
    currentDay,
    currentWeekIndex,
    startingOnMonday,
    onWeekChange
}: MealMapWeekNavProps) {
    // Calculate the date of the first day of the current week
    const firstDayOfWeek = new Date(currentDay.getFullYear(), 0, 1 + (currentWeekIndex - 1) * 7);
    
    // Adjust to start on Monday if startingOnMonday is true
    const currentDayOfWeek = firstDayOfWeek.getDay(); // 0 = Sunday, 1 = Monday, etc.
    let adjustment;
    if (startingOnMonday) {
        adjustment = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;  // If Sunday, go back 6 days, otherwise go to Monday
    } else {
        adjustment = 0 - currentDayOfWeek;  // Go to Sunday
    }
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() + adjustment);
    
    // Calculate the date of the last day of the current week (6 days after first day)
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
    
    // Get month(s) - show both if week spans two months
    const startMonth = firstDayOfWeek.toLocaleString('default', { month: 'long' });
    const endMonth = lastDayOfWeek.toLocaleString('default', { month: 'long' });
    const monthDisplay = startMonth === endMonth ? startMonth : `${startMonth}/${endMonth}`;
    
    // Get the year of the current week
    const currentYear = firstDayOfWeek.getFullYear();
    
    // Calculate the relative week number within the year (1-52)
    // const weekInYear = Math.ceil((firstDayOfWeek.getTime() - new Date(currentYear, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;

    return (
        <div className={styles.weekNavContainer}>
            <h3>{monthDisplay}</h3>
            <div className={styles.weekNavWeek}>
                <div className={styles.weekNavWeekButton} onClick={() => onWeekChange(currentWeekIndex - 1)}>
                    <ChevronSVG direction="left" />
                </div>
                <h3>
                    {firstDayOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {lastDayOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </h3>
                <div className={styles.weekNavWeekButton} onClick={() => onWeekChange(currentWeekIndex + 1)}>
                    <ChevronSVG direction="right" />
                </div>
            </div>
            <h3>{currentYear}</h3>
        </div>
    );
}

export default MealMapWeekNav;
