import { HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";
import Section from "@vuo/components/atoms/Section";
import { StarRating } from "@vuo/components/molecules/StarRating";
import styles from "./UserFoodProfile.module.scss";

import Day1BaconImage from "../../../../public/images/1.webp";
import Day2KetoImage from "../../../../public/images/2.webp";

export const UserFoodProfile = () => {
  return (
    <div className={styles.userFoodProfile}>
      <Section className={styles.userFoodProfile__section}>
        <img
          className={styles.userFoodProfile__img}
          src={Day1BaconImage}
          alt="Image profile"
        />
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
        <img
          className={styles.userFoodProfile__img}
          src={Day2KetoImage}
          alt="Image profile"
        />
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
