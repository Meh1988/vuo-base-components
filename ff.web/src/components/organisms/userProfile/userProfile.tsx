import {
  CaretDownFilled,
  CaretUpFilled,
  CheckOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Button from "@vuo/components/atoms/Button";
import Section from "@vuo/components/atoms/Section";
import { useEffect, useState } from "react";

import { FormData } from "@models/Onboarding";

import { cuisines } from "@vuo/constants/Onboarding";
import { AnimatePresence, motion } from "framer-motion";
import {
  cookingSkills,
  dietsPlan,
  pantry,
  pastExperience,
} from "../onboarding/constants/OnboardingSteps";
import styles from "./userProfile.module.scss";

interface UserProfileProps {
  profileData: FormData;
}

interface SectionPreferencesProps {
  label: string;
  value: string;
}

export const UserProfile = ({ profileData }: UserProfileProps) => {
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [userDislikesList, setUserDislikesList] = useState<string[]>(
    profileData?.dislikes || [],
  );

  const [userAllergiesList, setUserAllergiesList] = useState<string[]>(
    profileData?.allergies || [],
  );

  const detailsVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      height: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
    },
  };

  useEffect(() => {
    setUserDislikesList(profileData?.dislikes || []);
    setUserAllergiesList(profileData?.allergies || []);
  }, [profileData.dislikes, profileData.allergies]);

  const SectionPreference = ({ label, value }: SectionPreferencesProps) => (
    <Section className={styles.userPreferences__section}>
      <div className={styles.userPreferences__section__header}>
        <p className={styles.userPreferences__details__title}>{label}</p>
      </div>
      <p className={styles.userPreferences__details__description}>{value}</p>
    </Section>
  );

  return (
    <div className={styles.userPreferences}>
      <Button
        variant="medium"
        color="secondary"
        className={styles.userPreferences__buttonDetails}
        onClick={() => setShowProfileDetails(!showProfileDetails)}
      >
        <p>Profile Details</p>
        {showProfileDetails ? <CaretUpFilled /> : <CaretDownFilled />}
      </Button>
      <AnimatePresence mode="wait">
        {showProfileDetails && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={detailsVariants}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div className={styles.userPreferences__details}>
              <div className={styles.userPreferences__details__row}>
                <SectionPreference label="Age" value={profileData?.age} />
                <SectionPreference label="Height" value={profileData?.height} />
              </div>

              <div className={styles.userPreferences__details__row}>
                <SectionPreference
                  label="Current weight"
                  value={profileData?.currentWeight}
                />
                <SectionPreference
                  label="Goal weight"
                  value={profileData?.goalWeight}
                />
              </div>

              <div className={styles.userPreferences__details__row}>
                <SectionPreference
                  label="Your mindset"
                  value={profileData?.mindset}
                />
                <SectionPreference label="Speed" value={profileData?.speed} />
              </div>

              <div className={styles.userPreferences__details__row}>
                <SectionPreference
                  label="Diet Plan"
                  value={
                    dietsPlan.find(
                      (dietsPlanItem) =>
                        dietsPlanItem.name.toLowerCase() ===
                        profileData?.dietPlan?.toLowerCase(),
                    )?.name || ""
                  }
                />
                <SectionPreference
                  label="Past Experience"
                  value={
                    pastExperience.find(
                      (pastExperienceItem) =>
                        pastExperienceItem.value ===
                        profileData?.pastExperience,
                    )?.label || ""
                  }
                />
              </div>

              <div className={styles.userPreferences__details__row}>
                <SectionPreference label="Format" value={profileData?.format} />
                <SectionPreference
                  label="Your pantry"
                  value={
                    pantry.find(
                      (pantryItem) => pantryItem.value === profileData?.pantry,
                    )?.label || ""
                  }
                />
              </div>

              <div className={styles.userPreferences__details__row}>
                <SectionPreference
                  label="Cooking skills"
                  value={
                    cookingSkills.find(
                      (cookingSkillsItem) =>
                        cookingSkillsItem.value === profileData?.cookingSkills,
                    )?.label || ""
                  }
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.userPreferences__header__title}>
        <p>Your preferences</p>
        <CheckOutlined />
      </div>
      <Section className={styles.userPreferences__section}>
        <div>
          <div className={styles.userPreferences__section__header}>
            <HeartFilled size={16} />
            <p className={styles.userPreferences__section__header__title}>
              Your goals
            </p>
          </div>

          <p className={styles.userPreferences__section__description}>
            What are your goals?
          </p>
        </div>
        <div className={styles.userPreferences__section__buttons}>
          {profileData?.goals?.map((goal) => (
            <Button
              key={goal}
              variant="medium"
              color="secondary"
              className={styles.onboardingButton}
            >
              {goal}
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
            Dislikes are things you don&rsquo;t want to be included in your
            recommendations
          </p>
        </div>
        <div className={styles.userPreferences__section__buttons}>
          {userDislikesList.map((dislike: string, index: number) => (
            <Button variant="medium" color="secondary" key={index}>
              {dislike}
            </Button>
          ))}
        </div>
      </Section>
      <Section className={styles.userPreferences__section}>
        <div>
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
        </div>
        <div className={styles.userPreferences__section__buttons}>
          {userAllergiesList.map((allergy: string, index: number) => (
            <Button variant="medium" color="secondary" key={index}>
              {allergy}
            </Button>
          ))}
        </div>
      </Section>
      <Section className={styles.userPreferences__section}>
        <div>
          <div className={styles.userPreferences__section__header}>
            <HeartFilled />
            <p className={styles.userPreferences__section__header__title}>
              Cuisines
            </p>
          </div>
          <p className={styles.userPreferences__section__description}>
            Things you like, things you want to be recommended to you!
          </p>
        </div>
        <div className={styles.userPreferences__section__buttons}>
          {profileData.cuisinePreferences &&
            cuisines.map(
              (cuisinesItem) =>
                profileData.cuisinePreferences[cuisinesItem] === "like" && (
                  <Button
                    key={cuisinesItem}
                    variant="medium"
                    color="secondary"
                    className={styles.onboardingButton}
                  >
                    {cuisinesItem}
                  </Button>
                ),
            )}
        </div>
      </Section>
    </div>
  );
};
