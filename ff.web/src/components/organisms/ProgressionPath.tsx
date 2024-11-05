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
        const isActive = true;
        const xOffset = (() => {
            if (index % 5 < 3) return (index % 5 * 30);
            return index % 5 === 3 ? 15 : 0;
        })();

        const isPlayable = true;

        return (
            // eslint-disable-next-line react/button-has-type
            <button
                key={quest.id}
                onClick={() => isPlayable && onQuestClick(quest)}
                className={`${styles.progressionPathQuestButton} ${
                    isPlayable ? styles.progressionPathQuestButtonPlayable : ''
                } ${isActive ? styles.progressionPathQuestButtonActive : styles.progressionPathQuestButtonInactive}`}
                style={{
                    transform: `translateX(${xOffset}px)`,
                    backgroundColor: isPlayable ? 'var(--color-grey-systemGrayAccessibleLight)' : '#E5E7EB',
                }}
            >
            {(() => {
                switch (quest.type) {
                    case 'recipe':
                        return '🍳';
                    case 'minigame':
                        return '🎮';
                    case 'minigame-virtual-sear':
                        return '🥩';
                    case 'minigame-cut-guessr':
                        return '🔪';
                    case 'minigame-conversation-starter':
                        return '💭';
                    case 'minigame-ingredient-match':
                        return '🎯';
                    case 'minigame-quiz':
                        return '❓';
                    default:
                        return '📋';
                }
            })()}
            </button>
        );
    };

    const renderUnit = (unit: Unit) => (
        <div key={unit.id} className={styles.progressionPathUnit}>
            <div className={styles.progressionPathUnitHeader} style={{ backgroundColor: unit.color }}>
                <div>
                    <h2 className={styles.progressionPathUnitTitle}>{unit.title}</h2>
                    <p>{unit.description}</p>
                </div>
            </div>
            <div className={styles.progressionPathUnitContent}>
                {unit.quests.map((quest, index) => renderLevel(unit, quest, index))}
            </div>
        </div>
    );

    return (
        <div ref={scrollContainerRef} className={styles.progressionPath}>
            {units.map(renderUnit)}
        </div>
    );
}
