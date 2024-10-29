import {
  CheckOutlined,
  CloseOutlined,
  HeartFilled,
  PlusOutlined,
} from "@ant-design/icons";
import Button from "@vuo/components/atoms/Button";
import Input from "@vuo/components/atoms/Input";
import Section from "@vuo/components/atoms/Section";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import styles from "./userPreferences.module.scss";

interface UserPreferencesProps {
  listOfAllergies: string[];
  listOfDiets: string[];
  listOfCuisinePreferences: Record<string, string>;
}

export const UserPreferences = ({
  listOfAllergies,
  listOfDiets,
  listOfCuisinePreferences,
}: UserPreferencesProps) => {
  const [userDiets, setUserDiets] = useState<string>("");
  const [userDietsList, setUserDietsList] = useState<string[]>(
    listOfDiets || [],
  );

  const [userAllergies, setUserAllergies] = useState<string>("");
  const [userAllergiesList, setUserAllergiesList] = useState<string[]>(
    listOfAllergies || [],
  );
  const [userCuisinePreferences, setUserCuisinePreferences] =
    useState<string>("");
  const [userCuisinePreferencesList, setUserCuisinePreferencesList] = useState<
    string[]
  >([]);

  const itemAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.2 },
  };

  useEffect(() => {
    setUserDietsList(listOfDiets || []);
    setUserAllergiesList(listOfAllergies || []);

    if (listOfCuisinePreferences) {
      setUserCuisinePreferencesList(
        Object.entries(listOfCuisinePreferences)
          .filter(([_, preference]) => preference === "like")
          .map(([cuisine]) => cuisine),
      );
    } else {
      setUserCuisinePreferencesList([]);
    }
  }, [listOfDiets, listOfAllergies]);

  return (
    <div className={styles.userPreferences}>
      <div className={styles.userPreferences__header__title}>
        <p>Your preferences</p>
        <CheckOutlined />
      </div>

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
          <AnimatePresence>
            {userDietsList.map((diet: string, index: number) => (
              <motion.div key={index} layout {...itemAnimation}>
                <Button
                  variant="medium"
                  color="secondary"
                  onClick={() => {
                    setUserDietsList((prev) =>
                      prev.filter((_, index) => index !== prev.indexOf(diet)),
                    );
                  }}
                >
                  {diet} <CloseOutlined />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className={styles.userPreferences__section__input}>
          <Input
            value={userDiets}
            placeholder="Add a dislike"
            onChange={(e) => {
              setUserDiets(e.target.value);
            }}
            className={styles.userPreferences__section__input__text}
          />

          <Button
            variant="medium"
            color="primary"
            onClick={() => {
              setUserDietsList((prev) => [...prev, userDiets.trim()]);
              setUserDiets("");
            }}
            disabled={userDiets.trim() === ""}
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
          <AnimatePresence>
            {userAllergiesList.map((allergy: string, index: number) => (
              <motion.div key={index} layout {...itemAnimation}>
                <Button
                  variant="medium"
                  color="secondary"
                  onClick={() => {
                    setUserAllergiesList((prev) =>
                      prev.filter(
                        (_, index) => index !== prev.indexOf(allergy),
                      ),
                    );
                  }}
                >
                  {allergy} <CloseOutlined />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className={styles.userPreferences__section__input}>
          <Input
            value={userAllergies}
            placeholder="Add a like"
            onChange={(e) => {
              setUserAllergies(e.target.value);
            }}
            className={styles.userPreferences__section__input__text}
          />

          <Button
            variant="medium"
            color="primary"
            onClick={() => {
              setUserAllergies("");
              setUserAllergiesList((prev) => [...prev, userAllergies]);
            }}
            disabled={userAllergies.trim() === ""}
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
          <AnimatePresence>
            {userCuisinePreferencesList.map((like: string, index: number) => (
              <motion.div key={index} layout {...itemAnimation}>
                <Button
                  key={index}
                  variant="medium"
                  color="secondary"
                  onClick={() => {
                    setUserCuisinePreferencesList((prev) =>
                      prev.filter((_, index) => index !== prev.indexOf(like)),
                    );
                  }}
                >
                  {like} <CloseOutlined />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className={styles.userPreferences__section__input}>
          <Input
            value={userCuisinePreferences}
            placeholder="Add a diet"
            onChange={(e) => {
              setUserCuisinePreferences(e.target.value);
            }}
            className={styles.userPreferences__section__input__text}
          />

          <Button
            variant="medium"
            color="primary"
            onClick={() => {
              setUserCuisinePreferences("");
              setUserCuisinePreferencesList((prev) => [
                ...prev,
                userCuisinePreferences,
              ]);
            }}
            disabled={userCuisinePreferences.trim() === ""}
          >
            Add <PlusOutlined />
          </Button>
        </div>
      </Section>
    </div>
  );
};
