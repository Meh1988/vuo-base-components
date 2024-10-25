import { ThemeContext } from "@vuo/context/ThemeContext";
import useStackNavigator from "@vuo/hooks/StackNavigator";
import Page from "@vuo/templates/Page";
import { useContext, useEffect, useState } from "react";
import { Avatar } from "../atoms/Avatar";
import { UserPreferences } from "../organisms/userPreferences";
import { PlusOutlined } from "@ant-design/icons";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Section from "../atoms/Section";
import styles from "./ProfilePage.module.scss";
import { Tabs } from "../molecules/Tabs";

const ProfilePage = function () {
  const { toggleTheme } = useContext(ThemeContext);
  const [profileData, setProfileData] = useState<any>(null); // Ensure it's typed correctly
  const { navigateWithState } = useStackNavigator();

  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      delete parsedProfile.completedSteps; // Remove the completedSteps key
      setProfileData(parsedProfile); // Set the modified profile data
    }
  }, []);

  //TODO fix this creappy UI

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
        <Button variant="small" color="secondary">
          Delete account
        </Button>
      </div>

      {/* {profileData && (
        <div>
          <h4>Your Dietary Preferences</h4>
          {Object.entries(profileData).map(([key, value]) => {
            // Skip rendering if the value is an object but not an array
            if (typeof value === "object" && !Array.isArray(value)) {
              return null;
            }

            return (
              <div key={key} style={{ marginBottom: "1rem" }}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                {Array.isArray(value) ? (
                  <ul>
                    {value.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{value}</p>
                )}
              </div>
            );
          })}
        </div>
      )} */}
    </Page>
  );
};

export default ProfilePage;