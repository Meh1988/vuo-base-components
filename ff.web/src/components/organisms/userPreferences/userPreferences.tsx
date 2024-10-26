import { CloseOutlined, HeartFilled, PlusOutlined } from "@ant-design/icons";
import Button from "@vuo/components/atoms/Button";
import Input from "@vuo/components/atoms/Input";
import Section from "@vuo/components/atoms/Section";
import { useState } from "react";
import styles from "./userPreferences.module.scss";

export const UserPreferences = () => {
  const [diets, setDiets] = useState<string>("");
  const [dietsList, setDietsList] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string>("");
  const [allergiesList, setAllergiesList] = useState<string[]>([]);
  const [likes, setLikes] = useState<string>("");
  const [likesList, setLikesList] = useState<string[]>([]);

  return (
    <div className={styles.userPreferences}>
      <Section className={styles.userPreferences__section}>
        <div className={styles.userPreferences__section__header}>
          <HeartFilled />
          <p className={styles.userPreferences__section__header__title}>
            Diets
          </p>
        </div>

        <p className={styles.userPreferences__section__description}>
          Diets you are on
        </p>
        <div className={styles.userPreferences__section__buttons}>
          {dietsList.map((diet: string, index: number) => (
            <Button
              key={index}
              variant="medium"
              color="secondary"
              onClick={() => {
                setDietsList((prev) =>
                  prev.filter((_, index) => index !== prev.indexOf(diet)),
                );
              }}
            >
              {diet} <CloseOutlined />
            </Button>
          ))}
        </div>
        <div className={styles.userPreferences__section__input}>
          <Input
            value={diets}
            placeholder="Add a dislike"
            onChange={(e) => {
              setDiets(e.target.value);
            }}
            className={styles.userPreferences__section__input__text}
          />

          <Button
            variant="medium"
            color="primary"
            onClick={() => {
              setDietsList((prev) => [...prev, diets.trim()]);
              setDiets("");
            }}
            disabled={diets.trim() === ""}
          >
            Add <PlusOutlined />
          </Button>
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <div className={styles.userPreferences__section__header}>
          <HeartFilled />
          <p className={styles.userPreferences__section__header__title}>
            Allergies
          </p>
        </div>
        <p className={styles.userPreferences__section__description}>
          Things you ABOSOLUTELY DONT'T WANT TO BE INCLUDED in your
          recommendations
        </p>
        <div className={styles.userPreferences__section__buttons}>
          {allergiesList.map((allergy: string) => (
            <Button
              variant="medium"
              color="secondary"
              onClick={() => {
                setAllergiesList((prev) =>
                  prev.filter((_, index) => index !== prev.indexOf(allergy)),
                );
              }}
            >
              {allergy} <CloseOutlined />
            </Button>
          ))}
        </div>
        <div className={styles.userPreferences__section__input}>
          <Input
            value={allergies}
            placeholder="Add a like"
            onChange={(e) => {
              setAllergies(e.target.value);
            }}
            className={styles.userPreferences__section__input__text}
          />

          <Button
            variant="medium"
            color="primary"
            onClick={() => {
              setAllergies("");
              setAllergiesList((prev) => [...prev, allergies]);
            }}
            disabled={allergies.trim() === ""}
          >
            Add <PlusOutlined />
          </Button>
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <div className={styles.userPreferences__section__header}>
          <HeartFilled size={16} />
          <p className={styles.userPreferences__section__header__title}>
            Likes
          </p>
        </div>
        <p className={styles.userPreferences__section__description}>
          Things you like, things you want to be recommended to you!
        </p>
        <div className={styles.userPreferences__section__buttons}>
          {likesList.map((like: string) => (
            <Button
              variant="medium"
              color="secondary"
              onClick={() => {
                setLikesList((prev) =>
                  prev.filter((_, index) => index !== prev.indexOf(like)),
                );
              }}
            >
              {like} <CloseOutlined />
            </Button>
          ))}
        </div>
        <div className={styles.userPreferences__section__input}>
          <Input
            value={likes}
            placeholder="Add a diet"
            onChange={(e) => {
              setLikes(e.target.value);
            }}
            className={styles.userPreferences__section__input__text}
          />

          <Button
            variant="medium"
            color="primary"
            onClick={() => {
              setLikes("");
              setLikesList((prev) => [...prev, likes]);
            }}
            disabled={likes.trim() === ""}
          >
            Add <PlusOutlined />
          </Button>
        </div>
      </Section>
    </div>
  );
};
