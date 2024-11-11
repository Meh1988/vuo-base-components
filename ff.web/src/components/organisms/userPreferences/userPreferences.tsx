import { CloseOutlined, HeartFilled, PlusOutlined } from "@ant-design/icons";
import { FormData } from "@models/Onboarding";
import Button from "@vuo/components/atoms/Button";
import Input from "@vuo/components/atoms/Input";
import Section from "@vuo/components/atoms/Section";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { allergies, cuisines } from "@vuo/constants/Onboarding";
import {
  cookingSkills,
  dietsPlan,
  goals,
  pantry,
} from "../onboarding/constants/OnboardingSteps";
import styles from "./userPreferences.module.scss";

interface UserPreferencesProps {
  listOfDiets: string[];
  userData: FormData;
  setUserData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const UserPreferences = ({
  userData,
  setUserData,
}: UserPreferencesProps) => {
  const [userDislikes, setUserDislikes] = useState<string>("");

  const [userLikes, setUserLikes] = useState<string>("");
  const [userLikesList, setUserLikesList] = useState<Set<string>>(new Set());
  const [userDislikesList, setUserDislikesList] = useState<Set<string>>(
    new Set(userData.dislikes || []),
  );

  const itemAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.2 },
  };

  useEffect(() => {
    setUserDislikesList(new Set(userData.dislikes || []));
    setUserLikesList(new Set(userData.likes || []));
  }, [userData.dislikes, userData.likes]);

  const Label = ({
    children,
  }: {
    children: React.ReactNode | React.ReactNode[];
  }) => <p className={styles.userPreferences__section__label}>{children}</p>;

  const handleCuisinePreference = (
    cuisine: string,
    preference: "like" | "dislike",
  ) => {
    setUserData((prev: FormData) => ({
      ...prev,
      cuisinePreferences: {
        ...prev.cuisinePreferences,
        [cuisine]: preference !== "like" ? "like" : "dislike",
      },
    }));
  };

  const handleToggle = <K extends keyof FormData>(field: K, value: string) => {
    setUserData((prev: FormData) => {
      if (!Array.isArray(prev[field])) {
        return { ...prev, [field]: [value] };
      }

      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];

      return { ...prev, [field]: newArray };
    });
  };

  return (
    <div className={styles.userPreferences}>
      <Section className={styles.userPreferences__section}>
        <Label>Name</Label>
        <div className={styles.userPreferences__section__input}>
          <Input
            value={userData.userName}
            placeholder="What's your name?"
            onChange={(e) => {
              setUserData((prev: FormData) => ({
                ...prev,
                userName: e.target.value,
              }));
            }}
            className={styles.userPreferences__section__input__text}
          />
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <Label>User Name</Label>
        <div className={styles.userPreferences__section__input}>
          <Input
            value={userData.userId}
            placeholder="What should we call you?"
            onChange={(e) => {
              setUserData((prev: FormData) => ({
                ...prev,
                userId: e.target.value,
              }));
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
            value={userData.description}
            onChange={(e) => {
              setUserData((prev: FormData) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
            placeholder="Enter your description"
            className={`${styles.onboardingInput} ${styles.onboardingInputTextarea}`}
          />
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <Label>Goal weight</Label>
        <div className={styles.userPreferences__section__input}>
          <Input
            value={userData.goalWeight}
            placeholder="What's your goal weight?"
            onChange={(e) => {
              setUserData((prev: FormData) => ({
                ...prev,
                goalWeight: e.target.value,
              }));
            }}
            className={styles.userPreferences__section__input__text}
          />
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <div>
          <Label>Your goals</Label>

          <p className={styles.userPreferences__section__description}>
            What are your goals?
          </p>
        </div>

        <div className={styles.userPreferences__section__buttons}>
          {goals.map((goal) => (
            <Button
              key={goal}
              variant="medium"
              color={userData.goals.includes(goal) ? "primary" : "secondary"}
              className={styles.onboardingButton}
              onClick={() => handleToggle("goals", goal)}
            >
              {goal}
            </Button>
          ))}
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <div>
          <Label>Activity Level</Label>

          <p className={styles.userPreferences__section__description}>
            How active are you?
          </p>
        </div>

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
        <div>
          <Label>Mindset</Label>

          <p className={styles.userPreferences__section__description}>
            How do you feel about the recipes you get?
          </p>
        </div>

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
        <div>
          <Label>Speed</Label>

          <p className={styles.userPreferences__section__description}>
            How fast do you want to cook?
          </p>
        </div>

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
        <div>
          <Label>Diets</Label>

          <p className={styles.userPreferences__section__description}>
            What diets do you follow?
          </p>
        </div>

        <div className={styles.userPreferences__section__buttons}>
          {dietsPlan.map((diet) => (
            <Button
              key={diet.name}
              variant="medium"
              color={
                userData.dietPlan === diet.name.toLowerCase()
                  ? "primary"
                  : "secondary"
              }
              className={styles.onboardingButton}
              onClick={() =>
                setUserData((prev: FormData) => ({
                  ...prev,
                  dietPlan: diet.name.toLowerCase(),
                }))
              }
            >
              {diet.name}
            </Button>
          ))}
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <div>
          <Label>Past experience</Label>

          <p className={styles.userPreferences__section__description}>
            How much experience do you have with cooking?
          </p>
        </div>

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
        <div>
          <Label>Pantry</Label>

          <p className={styles.userPreferences__section__description}>
            How stocked is your pantry?
          </p>
        </div>

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
        <div>
          <Label>Cooking Skills</Label>

          <p className={styles.userPreferences__section__description}>
            How good are you at cooking?
          </p>
        </div>

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
        <div>
          <div className={styles.userPreferences__section__header}>
            <HeartFilled />
            <p className={styles.userPreferences__section__header__title}>
              Dislikes
            </p>
          </div>

          <p className={styles.userPreferences__section__description}>
            Dislikes are things you don&apos;t want to be included in your
            recommendations
          </p>
        </div>
        <div className={styles.userPreferences__section__buttons}>
          <AnimatePresence>
            {[...userDislikesList].map((dislikes: string, index: number) => (
              <motion.div key={index} layout {...itemAnimation}>
                <Button
                  variant="medium"
                  color="secondary"
                  onClick={() => {
                    setUserDislikesList(
                      (prev) =>
                        new Set([...prev].filter((item) => item !== dislikes)),
                    );
                    handleToggle("dislikes", dislikes);
                  }}
                >
                  {dislikes} <CloseOutlined />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className={styles.userPreferences__section__input}>
          <Input
            value={userDislikes}
            placeholder="Add a dislike"
            onChange={(e) => {
              setUserDislikes(e.target.value);
            }}
            className={styles.userPreferences__section__input__text}
          />

          <Button
            variant="medium"
            color="primary"
            onClick={() => {
              const trimmedDislike = userDislikes.trim();
              if (!userDislikesList.has(trimmedDislike)) {
                setUserDislikes("");
                setUserDislikesList(
                  (prev) => new Set([...prev, trimmedDislike]),
                );
                handleToggle("dislikes", trimmedDislike);
              }
            }}
            disabled={
              userDislikes.trim() === "" ||
              userDislikesList.has(userDislikes.trim())
            }
          >
            Add <PlusOutlined />
          </Button>
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <div>
          <Label>Allergies</Label>

          <p className={styles.userPreferences__section__description}>
            Things you ABOSOLUTELY DONT’T WANT TO BE INCLUDED in your
            recommendations
          </p>
        </div>
        <div className={styles.userPreferences__section__buttons}>
          {allergies.map((allergy) => (
            <Button
              key={allergy}
              variant="medium"
              color={
                userData.allergies.includes(allergy) ? "primary" : "secondary"
              }
              className={styles.onboardingButton}
              onClick={() => handleToggle("allergies", allergy)}
            >
              {allergy}
            </Button>
          ))}
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <div>
          <Label>Cuisines</Label>

          <p className={styles.userPreferences__section__description}>
            Things you like, things you want to be recommended to you!
          </p>
        </div>

        <div className={styles.userPreferences__section__buttons}>
          {cuisines.map((cuisinesItem) => (
            <Button
              key={cuisinesItem}
              variant="medium"
              color={
                userData.cuisinePreferences[cuisinesItem] === "like"
                  ? "primary"
                  : "secondary"
              }
              className={styles.onboardingButton}
              onClick={() =>
                handleCuisinePreference(
                  cuisinesItem,
                  userData.cuisinePreferences[cuisinesItem] === "like"
                    ? "like"
                    : "dislike",
                )
              }
            >
              {cuisinesItem}
            </Button>
          ))}
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <div>
          <div className={styles.userPreferences__section__header}>
            <HeartFilled size={16} />
            <p className={styles.userPreferences__section__header__title}>
              Likes
            </p>
          </div>
          <p className={styles.userPreferences__section__description}>
            Things you like, things you want to be recommended to you!
          </p>
        </div>
        <div className={styles.userPreferences__section__buttons}>
          <AnimatePresence>
            {[...userLikesList].map((like: string, index: number) => (
              <motion.div key={index} layout {...itemAnimation}>
                <Button
                  key={index}
                  variant="medium"
                  color="secondary"
                  onClick={() => {
                    setUserLikesList(
                      (prev) =>
                        new Set([...prev].filter((item) => item !== like)),
                    );
                    handleToggle("likes", like);
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
            value={userLikes}
            placeholder="Add a like food"
            onChange={(e) => {
              setUserLikes(e.target.value);
            }}
            className={styles.userPreferences__section__input__text}
          />

          <Button
            variant="medium"
            color="primary"
            onClick={() => {
              const trimmedLike = userLikes.trim();
              if (!userLikesList.has(trimmedLike)) {
                setUserLikes("");
                setUserLikesList((prev) => new Set([...prev, trimmedLike]));
                handleToggle("likes", trimmedLike);
              }
            }}
            disabled={
              userLikes.trim() === "" || userLikesList.has(userLikes.trim())
            }
          >
            Add <PlusOutlined />
          </Button>
        </div>
      </Section>
    </div>
  );
};
