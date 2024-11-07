import { CloseOutlined, HeartFilled, PlusOutlined } from "@ant-design/icons";
import { FormData } from "@models/Onboarding";
import Button from "@vuo/components/atoms/Button";
import Input from "@vuo/components/atoms/Input";
import Section from "@vuo/components/atoms/Section";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  cookingSkills,
  goals,
  pantry,
} from "../onboarding/constants/OnboardingSteps";
import styles from "./userPreferences.module.scss";

interface UserPreferencesProps {
  listOfAllergies: string[];
  listOfDiets: string[];
  listOfCuisinePreferences: Record<string, string | null>;
  userData: FormData;
  setUserData: (data: FormData) => void;
}

export const UserPreferences = ({
  userData,
  setUserData,
  listOfAllergies,
  listOfDiets,
  listOfCuisinePreferences,
}: UserPreferencesProps) => {
  const [userDiets, setUserDiets] = useState<string>("");
  const [userDietsList, setUserDietsList] = useState<Set<string>>(
    new Set(listOfDiets || []),
  );

  const [userAllergies, setUserAllergies] = useState<string>("");
  const [userAllergiesList, setUserAllergiesList] = useState<Set<string>>(
    new Set(listOfAllergies || []),
  );
  const [userCuisinePreferences, setUserCuisinePreferences] =
    useState<string>("");
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
    setUserDietsList(new Set(listOfDiets || []));
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
  }, [listOfDiets, listOfAllergies, listOfCuisinePreferences]);

  const Label = ({
    children,
  }: {
    children: React.ReactNode | React.ReactNode[];
  }) => <p className={styles.userPreferences__section__label}>{children}</p>;

  const handleMultiSelect = (item: string, field: keyof FormData) => {
    setUserData((prev: FormData) => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(item)
        ? (prev[field] as string[]).filter((i: string) => i !== item)
        : [...(prev[field] as string[]), item],
    }));
  };

  return (
    <div className={styles.userPreferences}>
      <Section className={styles.userPreferences__section}>
        <Label>Name</Label>
        <div className={styles.userPreferences__section__input}>
          <Input
            value={userDiets}
            placeholder="What should we call you?"
            onChange={(e) => {
              setUserDiets(e.target.value);
            }}
            className={styles.userPreferences__section__input__text}
          />
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <Label>User Name</Label>
        <div className={styles.userPreferences__section__input}>
          <Input
            value={userDiets}
            placeholder="Update Name"
            onChange={(e) => {
              setUserDiets(e.target.value);
            }}
            className={styles.userPreferences__section__input__text}
          />
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <Label>Description</Label>
        <div className={styles.userPreferences__section__input}>
          <textarea
            name="description"
            value={userDiets}
            onChange={(e) => {
              setUserDiets(e.target.value);
            }}
            placeholder="Enter your description"
            className={`${styles.onboardingInput} ${styles.onboardingInputTextarea}`}
          />
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <Label>Your goals</Label>

        <div className={styles.userPreferences__section__buttons}>
          {goals.map((goal) => (
            <Button
              key={goal}
              variant="medium"
              color={userData.goals.includes(goal) ? "primary" : "secondary"}
              className={styles.onboardingButton}
              onClick={() => handleMultiSelect(goal, "goals")}
            >
              {goal}
            </Button>
          ))}
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <Label>Activity Level</Label>

        <div className={styles.userPreferences__section__buttons}>
          {[
            "sedentary",
            "light-exercise",
            "moderate-exercise",
            "heavy-exercise",
            "athlete",
          ].map((activityLevel) => (
            <Button
              key={activityLevel}
              variant="medium"
              color={
                userData.activityLevel === activityLevel
                  ? "primary"
                  : "secondary"
              }
              className={styles.onboardingButton}
              onClick={() =>
                setUserData((prev: FormData) => ({
                  ...prev,
                  activityLevel,
                }))
              }
            >
              {activityLevel}
            </Button>
          ))}
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <Label>Mindset</Label>

        <div className={styles.userPreferences__section__buttons}>
          {["agree", "neutral", "disagree"].map((mindset) => (
            <Button
              key={mindset}
              variant="medium"
              color={userData.mindset === mindset ? "primary" : "secondary"}
              className={styles.onboardingButton}
              onClick={() =>
                setUserData((prev: FormData) => ({
                  ...prev,
                  mindset,
                }))
              }
            >
              {mindset}
            </Button>
          ))}
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <Label>Speed</Label>

        <div className={styles.userPreferences__section__buttons}>
          {["slow", "moderate", "fast"].map((speed) => (
            <Button
              key={speed}
              variant="medium"
              color={userData.speed === speed ? "primary" : "secondary"}
              className={styles.onboardingButton}
              onClick={() =>
                setUserData((prev: FormData) => ({
                  ...prev,
                  speed,
                }))
              }
            >
              {speed}
            </Button>
          ))}
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <Label>Past experience</Label>

        <div className={styles.userPreferences__section__buttons}>
          {["no-past-experience", "tried-before"].map((pastExperience) => (
            <Button
              key={pastExperience}
              variant="medium"
              color={
                userData.pastExperience === pastExperience
                  ? "primary"
                  : "secondary"
              }
              className={styles.onboardingButton}
              onClick={() =>
                setUserData((prev: FormData) => ({
                  ...prev,
                  pastExperience,
                }))
              }
            >
              {pastExperience}
            </Button>
          ))}
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <Label>Pantry</Label>

        <div className={styles.userPreferences__section__buttons}>
          {pantry.map((pantryItem) => (
            <Button
              key={pantryItem.value}
              variant="medium"
              color={
                userData.pantry === pantryItem.value ? "primary" : "secondary"
              }
              className={styles.onboardingButton}
              onClick={() =>
                setUserData((prev: FormData) => ({
                  ...prev,
                  pantry: pantryItem.value,
                }))
              }
            >
              {pantryItem.label}
            </Button>
          ))}
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <Label>Cooking Skills</Label>

        <div className={styles.userPreferences__section__buttons}>
          {cookingSkills.map((cookingSkill) => (
            <Button
              key={cookingSkill.value}
              variant="medium"
              color={
                userData.cookingSkills === cookingSkill.value
                  ? "primary"
                  : "secondary"
              }
              className={styles.onboardingButton}
              onClick={() =>
                setUserData((prev: FormData) => ({
                  ...prev,
                  cookingSkills: cookingSkill.value,
                }))
              }
            >
              {cookingSkill.label}
            </Button>
          ))}
        </div>
      </Section>

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
            {[...userDietsList].map((diet: string, index: number) => (
              <motion.div key={index} layout {...itemAnimation}>
                <Button
                  variant="medium"
                  color="secondary"
                  onClick={() => {
                    setUserDietsList(
                      (prev) =>
                        new Set([...prev].filter((item) => item !== diet)),
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
              setUserDietsList((prev) => new Set([...prev, userDiets.trim()]));
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
          Things you ABOSOLUTELY DONT&rsquo;T WANT TO BE INCLUDED in your
          recommendations
        </p>
        <div className={styles.userPreferences__section__buttons}>
          <AnimatePresence>
            {[...userAllergiesList].map((allergy: string, index: number) => (
              <motion.div key={index} layout {...itemAnimation}>
                <Button
                  variant="medium"
                  color="secondary"
                  onClick={() => {
                    setUserAllergiesList(
                      (prev) =>
                        new Set([...prev].filter((item) => item !== allergy)),
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
              setUserAllergiesList(
                (prev) => new Set([...prev, userAllergies.trim()]),
              );
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
            {[...userCuisinePreferencesList].map(
              (like: string, index: number) => (
                <motion.div key={index} layout {...itemAnimation}>
                  <Button
                    key={index}
                    variant="medium"
                    color="secondary"
                    onClick={() => {
                      setUserCuisinePreferencesList(
                        (prev) =>
                          new Set([...prev].filter((item) => item !== like)),
                      );
                    }}
                  >
                    {like} <CloseOutlined />
                  </Button>
                </motion.div>
              ),
            )}
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
              setUserCuisinePreferencesList(
                (prev) => new Set([...prev, userCuisinePreferences.trim()]),
              );
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
