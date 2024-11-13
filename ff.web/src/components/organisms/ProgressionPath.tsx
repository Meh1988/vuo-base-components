import { useRef, useCallback } from 'react';
import type { Unit, ProgressionPathQuest } from '@vuo/models/ProgressionPathTypes';

import styles from './ProgressionPath.module.scss';
import CutGuessrIcon from '../atoms/ProgressionPathIcons/CutGuessrIcon';
import VirtualSearIcon from '../atoms/ProgressionPathIcons/VirtualSearIcon';
import ConversationStarterIcon from '../atoms/ProgressionPathIcons/ConversationStarterIcon';
import IngredientMatchIcon from '../atoms/ProgressionPathIcons/IngredientMatchIcon';
import QuizIcon from '../atoms/ProgressionPathIcons/QuizIcon';
import LockedIcon from '../atoms/ProgressionPathIcons/LockedIcon';

interface ProgressionPathProps {
    units: Unit[];
    onQuestClick: (quest: ProgressionPathQuest) => void;
    completedQuestIds: string[];
}

export default function ProgressionPath({ units, onQuestClick, completedQuestIds }: ProgressionPathProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const isUnitCompleted = (unit: Unit) => unit.quests.every(quest => completedQuestIds.includes(quest.id));

    const renderLevel = useCallback((unit: Unit, quest: ProgressionPathQuest, index: number, isParentUnitCompleted: boolean) => {
        const isPlayable = index === 0 || completedQuestIds.includes(
            unit.quests[index - 1].id
        );

        const isCompleted = completedQuestIds.includes(quest.id);

        const isActive = isPlayable && !isCompleted && (index === unit.quests.length - 1 || !completedQuestIds.includes(unit.quests[index].id));

        const xOffset = (() => {
            if (index % 5 < 3) return (index % 5 * 30);
            return index % 5 === 3 ? 15 : 0;
        })();

        return (
            <div className={styles.progressionPathQuestButtonWrapper} style={{
                transform: `translateX(${xOffset}px)`
            }}>
                {isActive && (
                    <div className={styles.progressionPathQuestButtonActiveBackground} />
                )}

                {/* eslint-disable-next-line react/button-has-type */}
                <button
                    key={quest.id}
                    onClick={() => isPlayable && onQuestClick(quest)}
                    className={`${styles.progressionPathQuestButton} 
                    ${isPlayable ? styles.progressionPathQuestButtonPlayable : styles.progressionPathQuestButtonNotPlayable} 
                    ${isActive ? styles.progressionPathQuestButtonActive : ''} 
                    ${isCompleted ? styles.progressionPathQuestButtonCompleted : ''}
                    ${isParentUnitCompleted ? styles.progressionPathQuestButtonCompletedUnit : ''}`}
                    style={{
                        ...(isParentUnitCompleted ? {
                            '--unit-color': "var(--surface-brand-gold)",
                        } : {
                            '--unit-color': unit.color,
                        }),
                        zIndex: isActive ? 1 : 'auto'
                    } as React.CSSProperties}
                >
                    <span className={styles.progressionPathQuestIcon}>
                        {(() => {
                            if (!isPlayable) return <LockedIcon />;
                            switch (quest.type) {
                                case 'recipe':
                                    return '🍳';
                                case 'minigame-virtual-sear':
                                    return <VirtualSearIcon />;
                                case 'minigame-cut-guessr':
                                    return <CutGuessrIcon />;
                                case 'minigame-conversation-starter':
                                    return <ConversationStarterIcon />;
                                case 'minigame-ingredient-match':
                                    return <IngredientMatchIcon />;
                                case 'minigame-quiz':
                                    return <QuizIcon />;
                                default:
                                    return '📋';
                            }
                        })()}
                    </span>
                </button>

            </div>
        );
    }, [completedQuestIds, onQuestClick]);

    const renderUnit = (unit: Unit) => (
        <div key={unit.id} className={styles.progressionPathUnit}>
            <div 
                className={`${styles.progressionPathUnitHeader} ${isUnitCompleted(unit) ? styles.progressionPathUnitHeaderCompleted : ''}`} 
                style={{
                    ...(isUnitCompleted(unit) ? {
                        backgroundColor: "var(--surface-brand-gold)",
                    } : {
                        backgroundColor: unit.color,
                    }),
                }}
            >
                <div>
                    <h2 className={styles.progressionPathUnitTitle}>
                        {unit.title}
                        {isUnitCompleted(unit) && ' ✓'}
                    </h2>
                    <p>{unit.description}</p>
                </div>
            </div>
            <div className={styles.progressionPathUnitContent}>
                {unit.quests.map((quest, index) => renderLevel(unit, quest, index, isUnitCompleted(unit)))}
            </div>
        </div>
    );

    return (
        <div ref={scrollContainerRef} className={styles.progressionPath}>
            {units.map(renderUnit)}
        </div>
    );
}
