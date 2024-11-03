import { HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";
import Section from "@vuo/components/atoms/Section";
import { StarRating } from "@vuo/components/molecules/StarRating";
import styles from "./UserFoodProfile.module.scss";

export const UserFoodProfile = () => {
  return (
    <div className={styles.userFoodProfile}>
      <Section className={styles.userFoodProfile__section}>
        <div className={styles.userFoodProfile__img}>
          {/* <img src="https://placehold.co/50x50" alt="Image profile" /> */}
        </div>
        <div className={styles.userFoodProfile__info}>
          <p className={styles.userFoodProfile__title}>
            Grill chicken avocado salad
          </p>
          <div className={styles.userFoodProfile__icons}>
            <HeartFilled />
            <ShoppingCartOutlined />
          </div>
          <p className={styles.userFoodProfile__rating}>Very Good</p>
          <StarRating />
        </div>
      </Section>
      <Section className={styles.userFoodProfile__section}>
        <div className={styles.userFoodProfile__img}>
          {/* <img src="https://placehold.co/50x50" alt="Image profile" /> */}
        </div>
        <div className={styles.userFoodProfile__info}>
          <p className={styles.userFoodProfile__title}>
            Mexican cauliflower rice
          </p>
          <div className={styles.userFoodProfile__icons}>
            <HeartFilled />
            <ShoppingCartOutlined />
          </div>
          <p className={styles.userFoodProfile__rating}>Very Good</p>
          <StarRating />
        </div>
      </Section>
    </div>
  );
};
