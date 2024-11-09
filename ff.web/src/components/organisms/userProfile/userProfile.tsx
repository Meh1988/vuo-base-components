import { CheckOutlined, HeartFilled } from "@ant-design/icons";
import Button from "@vuo/components/atoms/Button";
import Section from "@vuo/components/atoms/Section";
import { useEffect, useState } from "react";

import { FormData } from "@models/Onboarding";

import { cuisines } from "@vuo/constants/Onboarding";
import styles from "./userProfile.module.scss";

interface UserProfileProps {
  profileData: FormData;
  listOfCuisinePreferences: Record<string, string | null>;
}

export const UserProfile = ({
  profileData,
  listOfCuisinePreferences,
}: UserProfileProps) => {
  const [userDislikesList, setUserDislikesList] = useState<string[]>(
    profileData?.dislikes || [],
  );

  const [userAllergiesList, setUserAllergiesList] = useState<string[]>(
    profileData?.allergies || [],
  );
  const [userCuisinePreferencesList, setUserCuisinePreferencesList] = useState<
    Set<string>
  >(new Set());

  useEffect(() => {
    setUserDislikesList(profileData?.dislikes || []);
    setUserAllergiesList(profileData?.allergies || []);

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
  }, [profileData.dislikes, profileData.allergies, listOfCuisinePreferences]);

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
          {[...userCuisinePreferencesList].map(
            (like: string, index: number) => (
              <Button key={index} variant="medium" color="secondary">
                {like}
              </Button>
            ),
          )}
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
