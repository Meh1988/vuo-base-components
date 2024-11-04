import { ThemeContext } from "@vuo/context/ThemeContext";
import useStackNavigator from "@vuo/hooks/StackNavigator";
import Page from "@vuo/templates/Page";
import { useContext, useEffect, useState } from "react";
import { Avatar } from "../atoms/Avatar";

import Button from "../atoms/Button";
import { Modal } from "../molecules/Modal";
import { Tabs } from "../molecules/Tabs";
import { UserPreferences } from "../organisms/userPreferences";
import styles from "./ProfilePage.module.scss";

const ProfilePage = function () {
  const { toggleTheme } = useContext(ThemeContext);
  const [profileData, setProfileData] = useState<any>(null); // Ensure it's typed correctly
  const { navigateWithState } = useStackNavigator();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      delete parsedProfile.completedSteps; // Remove the completedSteps key
      setProfileData(parsedProfile); // Set the modified profile data
    }
  }, []);

  const confirmDeleteAccount = () => {
    localStorage.removeItem("profileData");
    navigateWithState("/home");
  };

  const FooterContent = () => {
    return (
      <>
        <Button
          variant="small"
          color="tertiary"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          Cancel
        </Button>

        <Button variant="small" color="primary" onClick={confirmDeleteAccount}>
          Delete
        </Button>
      </>
    );
  };

  return (
    <Page>
      <div className={styles.profilePage__header}>
        <div className={styles.profilePage__header__avatar}>
          <Avatar src="https://placehold.co/50x50" alt="Image profile" />
          <div className={styles.profilePage__avatarInfo}>
            <p className={styles.profilePage__avatarInfo__name}>Shawn</p>
            <p className={styles.profilePage__avatarInfo__role}>Umami Master</p>
          </div>
        </div>

        <Button
          variant="small"
          color="primary"
          onClick={() => {
            navigateWithState("/onboarding");
          }}
        >
          Edit Profile
        </Button>
      </div>
      <Tabs
        tabs={[
          {
            id: "tab1",
            label: "YOUR PROFILE",
            content: (
              <UserPreferences
                listOfAllergies={profileData?.allergies}
                listOfDiets={profileData?.diets}
                listOfCuisinePreferences={profileData?.cuisinePreferences}
              />
            ),
          },
          { id: "tab2", label: "FOOD PROFILE", content: <div>Content 2</div> },
        ]}
      />

      <div className={styles.profilePage__footer}>
        <Button
          variant="large"
          color="primary"
          onClick={() => {
            toggleTheme();
          }}
        >
          Change Theme
        </Button>
        <Button
          variant="small"
          color="secondary"
          onClick={() => {
            setIsDeleteModalOpen(true);
          }}
        >
          Delete account
        </Button>
      </div>

      {isDeleteModalOpen && (
        <Modal
          title="Delete account"
          isOpen={isDeleteModalOpen}
          footerContent={<FooterContent />}
        >
          <p>Are you sure you want to delete your account?</p>
        </Modal>
      )}
    </Page>
  );
};

export default ProfilePage;
