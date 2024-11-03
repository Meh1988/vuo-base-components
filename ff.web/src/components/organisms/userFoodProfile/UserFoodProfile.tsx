import { HeartFilled } from "@ant-design/icons";
import Section from "@vuo/components/atoms/Section";
import styles from "./UserFoodProfile.module.scss";

export const UserFoodProfile = () => {
  return (
    <div className={styles.userFoodProfile}>
      <Section className={styles.userFoodProfile__section}>
        <div className={styles.userFoodProfile__img}>
          {/* <img src="https://placehold.co/50x50" alt="Image profile" /> */}
        </div>
        <div className={styles.userFoodProfile__info}>
          <p>Grill chicken avocado salad</p>
          <HeartFilled />
          <p>Very Good</p>
        </div>
      </Section>
      <Section className={styles.userFoodProfile__section}>
        <div className={styles.userFoodProfile__img}>
          {/* <img src="https://placehold.co/50x50" alt="Image profile" /> */}
        </div>
        <div className={styles.userFoodProfile__info}>
          <p>Mexican cauliflower rice</p>
          <HeartFilled />
          <p>Very Good</p>
        </div>
      </Section>
    </div>
  );
};
