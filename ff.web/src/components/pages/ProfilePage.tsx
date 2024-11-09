import { Avatar } from "@vuo/atoms/Avatar";
import useStackNavigator from "@vuo/hooks/StackNavigator";
import Page from "@vuo/templates/Page";
import { useEffect, useState } from "react";

import { FormData } from "@models/Onboarding";
import Button from "@vuo/atoms/Button";
import { Tabs } from "../molecules/Tabs";
import { UserFoodProfile } from "../organisms/userFoodProfile";
import { UserProfile } from "../organisms/userProfile";
import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<FormData>({} as FormData); // Ensure it's typed correctly
  const { navigateWithState } = useStackNavigator();

  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      delete parsedProfile.completedSteps; // Remove the completedSteps key
      setProfileData(parsedProfile); // Set the modified profile data
    }
  }, []);

  return (
    <Page>
      <div className={styles.profilePage__header}>
        <div className={styles.profilePage__header__avatar}>
          <Avatar src="https://placehold.co/50x50" alt="Image profile" />
          <div className={styles.profilePage__avatarInfo}>
            <p className={styles.profilePage__avatarInfo__name}>
              {profileData?.userName || "User Name Profile"}
            </p>
            <p className={styles.profilePage__avatarInfo__role}>
              {profileData?.userId || "User ID Profile"}
            </p>
          </div>
        </div>
        {profileData?.description !== "" && (
          <p className={styles.profilePage__header__description}>
            {profileData?.description || "User Description Profile"}
          </p>
        )}
      </div>

      <Button
        variant="small"
        color="primary"
        onClick={() => {
          navigateWithState("/profile/edit");
        }}
        className="w-100"
      >
        Edit Profile
      </Button>
      <Tabs
        tabs={[
          {
            id: "tab1",
            label: "YOUR PROFILE",
            content: <UserProfile profileData={profileData} />,
          },
          { id: "tab2", label: "FOOD PROFILE", content: <UserFoodProfile /> },
        ]}
      />
    </Page>
  );
};

export default ProfilePage;
