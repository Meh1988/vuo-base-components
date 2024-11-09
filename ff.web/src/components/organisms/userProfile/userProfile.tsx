import { CheckOutlined, HeartFilled } from "@ant-design/icons";
import Button from "@vuo/components/atoms/Button";
import Section from "@vuo/components/atoms/Section";
import { useEffect, useState } from "react";

import { FormData } from "@models/Onboarding";

import { cuisines } from "@vuo/constants/Onboarding";
import styles from "./userProfile.module.scss";

interface UserProfileProps {
  profileData: FormData;
}

interface SectionPreferencesProps {
  label: string;
  value: string;
}

export const UserProfile = ({ profileData }: UserProfileProps) => {
  const [userDislikesList, setUserDislikesList] = useState<string[]>(
    profileData?.dislikes || [],
  );

  const [userAllergiesList, setUserAllergiesList] = useState<string[]>(
    profileData?.allergies || [],
  );

  useEffect(() => {
    setUserDislikesList(profileData?.dislikes || []);
    setUserAllergiesList(profileData?.allergies || []);
  }, [profileData.dislikes, profileData.allergies]);

  const SectionPreference = ({ label, value }: SectionPreferencesProps) => (
    <Section className={styles.userPreferences__section}>
      <div className={styles.userPreferences__section__header}>
        <p className={styles.userPreferences__section__header__title}>
          {label}
        </p>
      </div>
      <p className={styles.userPreferences__section__description}>{value}</p>
    </Section>
  );

  return (
    <div className={styles.userPreferences}>
      <div className={styles.userPreferences__header__title}>
        <p>Profile Details</p>
        <CheckOutlined />
      </div>

      <div className={styles.userPreferences__row}>
        <SectionPreference label="Age" value={profileData?.age} />
        <SectionPreference label="Height" value={profileData?.height} />
      </div>

      <div className={styles.userPreferences__row}>
        <SectionPreference
          label="Current weight"
          value={profileData?.currentWeight}
        />
        <SectionPreference
          label="Goal weight"
          value={profileData?.goalWeight}
        />
      </div>
      <div className={styles.userPreferences__row}>
        <SectionPreference label="Your mindset" value={profileData?.mindset} />
        <SectionPreference label="Speed" value={profileData?.speed} />
      </div>
      <div className={styles.userPreferences__row}>
        <SectionPreference label="Diet Plan" value={profileData?.dietPlan} />
        <SectionPreference
          label="Past Experience"
          value={profileData?.pastExperience}
        />
      </div>
      <div className={styles.userPreferences__row}>
        <SectionPreference label="Format" value={profileData?.format} />
        <SectionPreference label="Your pantry" value={profileData?.pantry} />
      </div>
      <div className={styles.userPreferences__row}>
        <SectionPreference
          label="Cooking skills"
          value={profileData?.cookingSkills}
        />
      </div>

      <div className={styles.userPreferences__header__title}>
        <p>Your preferences</p>
        <CheckOutlined />
      </div>

      <Section className={styles.userPreferences__section}>
        <div className={styles.userPreferences__section__header}>
          <HeartFilled size={16} />
          <p className={styles.userPreferences__section__header__title}>
            Your goals
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
          {userDislikesList.map((dislike: string, index: number) => (
            <Button variant="medium" color="secondary" key={index}>
              {dislike}
            </Button>
          ))}
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
          {userAllergiesList.map((allergy: string, index: number) => (
            <Button variant="medium" color="secondary" key={index}>
              {allergy}
            </Button>
          ))}
        </div>
      </Section>

      <Section className={styles.userPreferences__section}>
        <div className={styles.userPreferences__section__header}>
          <HeartFilled />
          <p className={styles.userPreferences__section__header__title}>
            Cuisines
          </p>
        </div>
        <p className={styles.userPreferences__section__description}>
          Things you like, things you want to be recommended to you!
        </p>
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
