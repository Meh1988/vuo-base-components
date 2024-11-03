import {
  FilterOutlined,
  HeartFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Section from "@vuo/components/atoms/Section";
import { StarRating } from "@vuo/components/molecules/StarRating";
import styles from "./UserFoodProfile.module.scss";

import Day1BaconImage from "../../../../public/images/1.webp";
import Day2KetoImage from "../../../../public/images/2.webp";

export const UserFoodProfile = () => {
  return (
    <div className={styles.userFoodProfile}>
      <div className={styles.userFoodProfile__title}>
        <p>Recent meals</p>
        <FilterOutlined />
      </div>
      <div className={styles.userFoodProfile__content}>
        <Section className={styles.userFoodProfile__content__section}>
          <img
            className={styles.userFoodProfile__content__img}
            src={Day1BaconImage}
            alt="Image profile"
          />
          <div className={styles.userFoodProfile__content__info}>
            <p className={styles.userFoodProfile__content__title}>
              Grill chicken avocado salad
            </p>
            <div className={styles.userFoodProfile__content__icons}>
              <HeartFilled />
              <ShoppingCartOutlined />
            </div>
            <p className={styles.userFoodProfile__content__rating}>Very Good</p>
            <StarRating />
          </div>
        </Section>
        <Section className={styles.userFoodProfile__content__section}>
          <img
            className={styles.userFoodProfile__content__img}
            src={Day2KetoImage}
            alt="Image profile"
          />
          <div className={styles.userFoodProfile__content__info}>
            <p className={styles.userFoodProfile__content__title}>
              Mexican cauliflower rice
            </p>
            <div className={styles.userFoodProfile__content__icons}>
              <HeartFilled />
              <ShoppingCartOutlined />
            </div>
            <p className={styles.userFoodProfile__content__rating}>Very Good</p>
            <StarRating />
          </div>
        </Section>
        <Section className={styles.userFoodProfile__content__section}>
          <img
            className={styles.userFoodProfile__content__img}
            src={Day2KetoImage}
            alt="Image profile"
          />
          <div className={styles.userFoodProfile__content__info}>
            <p className={styles.userFoodProfile__content__title}>
              Mexican cauliflower rice
            </p>
            <div className={styles.userFoodProfile__content__icons}>
              <HeartFilled />
              <ShoppingCartOutlined />
            </div>
            <p className={styles.userFoodProfile__content__rating}>Very Good</p>
            <StarRating />
          </div>
        </Section>

        <Section className={styles.userFoodProfile__content__section}>
          <img
            className={styles.userFoodProfile__content__img}
            src={Day2KetoImage}
            alt="Image profile"
          />
          <div className={styles.userFoodProfile__content__info}>
            <p className={styles.userFoodProfile__content__title}>
              Mexican cauliflower rice
            </p>
            <div className={styles.userFoodProfile__content__icons}>
              <HeartFilled />
              <ShoppingCartOutlined />
            </div>
            <p className={styles.userFoodProfile__content__rating}>Very Good</p>
            <StarRating />
          </div>
        </Section>
      </div>
    </div>
  );
};
