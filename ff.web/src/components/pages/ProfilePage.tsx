import { Avatar } from "@vuo/atoms/Avatar";
import useStackNavigator from "@vuo/hooks/StackNavigator";
import Page from "@vuo/templates/Page";
import { useContext, useEffect, useState } from "react";

import { FormData } from "@models/Onboarding";
import Button from "@vuo/atoms/Button";
import { ThemeContext } from "@vuo/context/ThemeContext";
import LoginViewModel from "../../viewModels/LoginViewModel";
import { Modal } from "../molecules/Modal";
import { Tabs } from "../molecules/Tabs";
// import LoginComponent from "../organisms/LoginComponent";
import { UserFoodProfile } from "../organisms/userFoodProfile";
import { UserProfile } from "../organisms/userProfile";
import styles from "./ProfilePage.module.scss";
import shadowAvatar from "../../assets/images/shadow-account.jpeg";
// import Section from "../atoms/Section";
// import LoginModal from "../organisms/LoginModal";
import LoginComponent from "../organisms/LoginComponent";

const ProfilePage = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const [profileData, setProfileData] = useState<FormData>({} as FormData); // Ensure it's typed correctly
  const { navigateWithState } = useStackNavigator();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [loginViewModel] = useState(() => new LoginViewModel());

  const handleLogout = async () => {
    await loginViewModel.logout();
    navigateWithState("/home");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const sessionData = JSON.parse(
          localStorage.getItem("SessionDataStore") || "{}",
        );
        const userId = sessionData.user?.id;
        const response = await fetch(
          `${import.meta.env.VITE_FFAPI_BASE_URL}/v1/profile/${userId}`,
        );
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const confirmDeleteAccount: () => void = () => {
    loginViewModel.deleteAccount();
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

  const avatarSrc = loginViewModel.sessionDataStore.user?.shadowAccount 
  ? shadowAvatar  // Add this image to your public folder
  : loginViewModel.sessionDataStore.user?.photoURL || "https://placehold.co/50x50";

  return (
    <Page>
      <div className={styles.profilePage__header}>
        <div className={styles.profilePage__header__avatar}>
          <Avatar
            src={avatarSrc}
            alt="Image profile"
          />
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
    
      <LoginComponent />
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
        {loginViewModel.sessionDataStore.user && (
          <Button variant="small" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        )}
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
