import { CheckOutlined, HeartFilled } from "@ant-design/icons";
import Button from "@vuo/components/atoms/Button";
import Section from "@vuo/components/atoms/Section";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import styles from "./userProfile.module.scss";

interface UserProfileProps {
  listOfAllergies: string[];
  listOfDislikes: string[];
  listOfCuisinePreferences: Record<string, string | null>;
}

export const UserProfile = ({
  listOfAllergies,
  listOfDislikes,
  listOfCuisinePreferences,
}: UserProfileProps) => {
  const [userDislikesList, setUserDislikesList] = useState<Set<string>>(
    new Set(listOfDislikes || []),
  );

  const [userAllergiesList, setUserAllergiesList] = useState<Set<string>>(
    new Set(listOfAllergies || []),
  );
  const [userCuisinePreferencesList, setUserCuisinePreferencesList] = useState<
    Set<string>
  >(new Set());

  const itemAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.2 },
  };

  useEffect(() => {
    setUserDislikesList(new Set(listOfDislikes || []));
    setUserAllergiesList(new Set(listOfAllergies || []));

    if (listOfCuisinePreferences) {
      setUserCuisinePreferencesList(
        new Set(
          Object.entries(listOfCuisinePreferences)
            .filter(([preference]) => preference === "like")
            .map(([cuisine]) => cuisine),
        ),
      );
    } else {
      setUserCuisinePreferencesList(new Set());
    }
  }, [listOfDislikes, listOfAllergies, listOfCuisinePreferences]);

  return (
    <div className={styles.userPreferences}>
      <div className={styles.userPreferences__header__title}>
        <p>Your preferences</p>
        <CheckOutlined />
      </div>

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
            {[...userCuisinePreferencesList].map(
              (like: string, index: number) => (
                <motion.div key={index} layout {...itemAnimation}>
                  <Button key={index} variant="medium" color="secondary">
                    {like}
                  </Button>
                </motion.div>
              ),
            )}
          </AnimatePresence>
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <div className={styles.userPreferences__section__header}>
          <HeartFilled />
          <p className={styles.userPreferences__section__header__title}>
            Dislikes
          </p>
        </div>

        <p className={styles.userPreferences__section__description}>
          Dislikes are things you don&rsquo;t want to be included in your
          recommendations
        </p>
        <div className={styles.userPreferences__section__buttons}>
          <AnimatePresence>
            {[...userDislikesList].map((dislike: string, index: number) => (
              <motion.div key={index} layout {...itemAnimation}>
                <Button variant="medium" color="secondary">
                  {dislike}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
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
          Things you ABOSOLUTELY DONT&rsquo;T WANT TO BE INCLUDED in your
          recommendations
        </p>
        <div className={styles.userPreferences__section__buttons}>
          <AnimatePresence>
            {[...userAllergiesList].map((allergy: string, index: number) => (
              <motion.div key={index} layout {...itemAnimation}>
                <Button variant="medium" color="secondary">
                  {allergy}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Section>
    </div>
  );
};
