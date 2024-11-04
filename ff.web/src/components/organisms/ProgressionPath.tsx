import { useRef } from 'react';
import type { Unit, ProgressionPathQuest } from '@vuo/models/ProgressionPathTypes';
import styles from './ProgressionPath.module.scss';

interface ProgressionPathProps {
    units: Unit[];
    onQuestClick: (quest: ProgressionPathQuest) => void;
}

export default function ProgressionPath({ units, onQuestClick }: ProgressionPathProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const renderLevel = (unit: Unit, quest: ProgressionPathQuest, index: number) => {
        const isActive = false;
        const xOffset = (() => {
            if (index % 5 < 3) return index % 5 * 60;
            return index % 5 === 3 ? 120 : 60;
        })();
        const yOffset = index * 80;

        const isPlayable = true;

        return (
            // eslint-disable-next-line react/button-has-type
            <button
                key={quest.id}
                onClick={() => isPlayable && onQuestClick(quest)}
                className={`${styles['progression-path__quest-button']} ${isPlayable ? styles['progression-path__quest-button--playable'] : ''
                    } ${isActive ? styles['progression-path__quest-button--active'] : styles['progression-path__quest-button--inactive']}`}
                style={{
                    left: `calc(50% - 80px + ${xOffset}px)`,
                    top: `${yOffset}px`,
                    backgroundColor: isPlayable ? unit.color.replace('bg-', '') : '#E5E7EB',
                }}
            >
                {/* eslint-disable-next-line no-nested-ternary */}
                {isActive ? (
                    <p className={styles.text}>icon</p>
                ) : index === 1 ? (
                    <p className={styles.text}>icon</p>
                ) : (
                    <p className={styles.text}>icon</p>
                )}
            </button>
        );
    };

    const renderUnit = (unit: Unit) => (
        <div key={unit.id} className={styles['progression-path__unit']}>
            <div className={styles['progression-path__unit-header']} style={{ backgroundColor: unit.color.replace('bg-', '') }}>
                <div>
                    <h2 className={styles['progression-path__unit-title']}>{unit.title}</h2>
                    <p>{unit.description}</p>
                </div>
            </div>
            <div className={styles['progression-path__unit-content']}>
                {unit.quests.map((quest, index) => renderLevel(unit, quest, index))}
            </div>
        </div>
    );

    return (
        <div ref={scrollContainerRef} className={styles['progression-path']}>
            {units.map(renderUnit)}
        </div>
    );
}
