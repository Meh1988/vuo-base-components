import { Avatar } from "@vuo/atoms/Avatar";
import useStackNavigator from "@vuo/hooks/StackNavigator";
import Page from "@vuo/templates/Page";
import { useEffect, useState } from "react";

import { FormData } from "@models/Onboarding";
import LoginViewModel from "@viewModels/LoginViewModel";
import Button from "@vuo/atoms/Button";
import { initialOnboardingData } from "@vuo/constants/Onboarding";
import { Modal } from "@vuo/molecules/Modal";
import { UserPreferences } from "@vuo/organisms/userPreferences";

import styles from "./EditProfile.module.scss";

export const EditProfile = () => {
  const [profileData, setProfileData] = useState<FormData>(
    initialOnboardingData,
  );
  const { navigateWithState, goBack } = useStackNavigator();
  const [loginViewModel] = useState(() => new LoginViewModel());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      delete parsedProfile.completedSteps;
      setProfileData(parsedProfile);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfileData((prevData) => ({
        ...prevData,
        image: imageUrl,
      }));
    }
  };

  return (
    <Page className={styles.editProfilePage}>
      <div className={styles.editProfilePage__header}>
        <label
          htmlFor="profile-image-input"
          className={styles.editProfilePage__header__uploadButton}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="profile-image-input"
          />
          <Avatar src={profileData.image} alt="Image profile" />
          <div>
            <p className={styles.editProfilePage__header__name}>Choose Image</p>
            <p className={styles.editProfilePage__header__description}>
              Please select a new profile picture
            </p>
          </div>
        </label>
      </div>

      <UserPreferences
        listOfDiets={profileData?.diets}
        userData={profileData}
        setUserData={setProfileData}
      />

      <div className={styles.editProfilePage__footer}>
        <Button
          variant="large"
          color="primary"
          onClick={() => {
            localStorage.setItem("profileData", JSON.stringify(profileData));
            loginViewModel.updateUserProfile(profileData.userId, profileData);
            goBack();
          }}
        >
          Save Changes
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
