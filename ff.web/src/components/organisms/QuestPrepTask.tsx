import { useState } from 'react'
import IconNames from '@vuo/models/IconTypes';
import Chip from '@vuo/atoms/Chip';
// import Icon from '@vuo/atoms/Icon';
import CheckListItem from '@vuo/molecules/CheckListItem';

import { Resource } from '@vuo/models/Resource';

import styles from './QuestPrepTask.module.scss'

export type QuestPrepTaskProps = {
  resources: Resource[];
  servingSize: string | undefined
}

export default function QuestPrepTask(props: QuestPrepTaskProps) {
  const { resources, servingSize = '1' } = props; // REMOVE THIS MFING ONE GRAAAAAAAAAAAA

  const [selectedResources, setSelectedResources] = useState<string[]>([])

  function toggleResource(resourceName: string): string[] {
    const index = selectedResources.indexOf(resourceName);
    if (index === -1) {
      return [...selectedResources, resourceName]
    }
    return selectedResources.filter(resource => resource !== resourceName)
  }

  const title = (resource: Resource) => resource.quantity ? `${resource.quantity} ${resource.unit}` : ''

  return (
    <div className={`${styles.container}`}>
      <div
        style={{ display: 'none' }} // DISABLED FOR NOW
      >
        <Chip backgroundColor='blue' className={styles.skill_chip}>
          {/* <Icon name={IconNames.Preparing} size={16} /> */}
          Preparing
        </Chip>
        <Chip className={styles.xp_chip}>
          +25XP
        </Chip>
      </div>
      <div className={styles.servings_text}>Servings: <div className={styles.serving_size}>{servingSize}</div></div>
      <div className={styles.checklist_container}>
        {resources.map((resource) =>
          <CheckListItem
            checked={selectedResources.includes(resource.name)}
            icon={IconNames.Preparing}
            key={resource.name}
            title={title(resource)}
            subtitle={resource.name}
            onValueChanged={() => setSelectedResources(toggleResource(resource.name))}
          />
        )}
      </div>
    </div>
  );
};