import { Quest } from '@vuo/models/Quest';
import styles from './QuestSelectCard.module.scss'
import PlayIcon from '../atoms/PlayIcon';

interface QuestSelectCardProps {
  quest: Quest;
  onClick?: (quest: Quest) => void;
}

function imageUrl(quest: Quest) {
  if (quest.media?.image) return quest.media.image
  if (quest.recipe?.media) return quest.recipe.media.image
  return null
}

function QuestMedia(props: { quest: Quest }) {
  const { quest } = props;
  let imageSrc = imageUrl(quest);
  if (!imageSrc) {
    imageSrc = "https://recipemedia.fra1.cdn.digitaloceanspaces.com/noMedia.png"
  };

  return (
    <div className={styles.img_container}>
      <img className={styles.img} alt="Quest media" src={`${imageSrc}`} />
    </div>
  )
}

function QuestSelectCard(props: QuestSelectCardProps) {
  const { quest, onClick } = props;

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    onClick?.(quest)
  }

  return (
    <div className={styles.container}>
      <QuestMedia quest={quest} />
      <div className={styles.title_container}>
        <h3 className={styles.title}>
          {quest.name ? quest.name : quest.recipe.name}
        </h3>
      </div>
      <div className={styles.text_container}>
        <span className={styles.text}>
          {quest.recipe?.description}
        </span>
      </div>
      <button
        type='button'
        className={styles.play_button}
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { handleButtonClick(e) }}
      >
        <PlayIcon />
      </button>
    </div>
  )
}

export default QuestSelectCard