// @ts-nocheck

import ProgressBar from "@vuo/atoms/ProgressBar"
// import IconNames from "@vuo/models/IconTypes";
import styles from './QuestProgressBar.module.scss'
// import Icon from "../atoms/Icon";
import Button from "../atoms/Button";

interface QuestProgressBarProps {
  onClose: () => void;
  questName?: string;
  recipeAuthor?: string,
  percent?: number
}

function QuestProgressBar({ onClose, questName, recipeAuthor, percent }: QuestProgressBarProps) {
  return (
    <div className={`${styles.container} gap-small`}>
      <button
        type="button"
        onClick={() => onClose()}
        className={`${styles.closeButton}`}>
        {/* <Icon name={IconNames.Close} size={14} /> */}
        X
      </button>
      <div>
        <div className={styles.barHeader}>
          <div className={styles.questName}>{questName}</div>
          {{ recipeAuthor } && (
            <div className="quest-name" style={{ fontStyle: 'italic' }}>{recipeAuthor}</div>
          )}
        </div>
        <ProgressBar value={percent} />
      </div>
    </div>
  );
}

export default QuestProgressBar