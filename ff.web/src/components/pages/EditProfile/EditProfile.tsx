import { Avatar } from "@vuo/atoms/Avatar";
import { ThemeContext } from "@vuo/context/ThemeContext";
import useStackNavigator from "@vuo/hooks/StackNavigator";
import Page from "@vuo/templates/Page";
import { useContext, useEffect, useState } from "react";

import { FormData } from "@models/Onboarding";
import Button from "@vuo/atoms/Button";
import { initialOnboardingData } from "@vuo/constants/Onboarding";
import { Modal } from "@vuo/molecules/Modal";
import { UserPreferences } from "@vuo/organisms/userPreferences";
import styles from "./EditProfile.module.scss";

export const EditProfile = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const [profileData, setProfileData] = useState<FormData>(
    initialOnboardingData,
  ); // Ensure it's typed correctly
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

  const FooterContent = () => (
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

  return (
    <Page className={styles.editProfilePage}>
      <div className={styles.editProfilePage__header}>
        <Avatar src="https://placehold.co/50x50" alt="Image profile" />
      </div>

      <UserPreferences
        listOfAllergies={profileData?.allergies}
        listOfDiets={profileData?.diets}
        listOfCuisinePreferences={profileData?.cuisinePreferences}
        userData={profileData}
        setUserData={setProfileData}
      />

      <div className={styles.editProfilePage__footer}>
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
