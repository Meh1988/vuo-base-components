// @ts-nocheck
import {
  allergies,
  commonDislikes,
  cuisines,
  initialOnboardingData,
} from "@constants/Onboarding";

import { steps } from "@constants/Onboarding";
import { OnboardingStatus } from "@models/Onboarding";
import Button from "@vuo/atoms/Button";
import ProgressBar from "@vuo/atoms/ProgressBar";
import Slider from "@vuo/atoms/Slider";
import { useAppContext } from "@vuo/context/AppContext";
import useStackNavigator from "@vuo/hooks/StackNavigator";
import ToggleSwitch from "@vuo/molecules/ToggleSwitch";

import { useEffect, useState } from "react";
import styles from "./Onboarding.module.scss";

interface PropsRenderStep {
  title: string;
  description: string;
  children?: React.ReactNode | React.ReactNode[];
}

// TODO add the status of the steps to the formData object, (you may need to modify the rendering of the steps)
const OnboardingFlow = () => {
  const { navigateWithState } = useStackNavigator();

  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const { setIsOnboardingComplete } = useAppContext();

  const [formData, setFormData] = useState(initialOnboardingData);

  useEffect(() => {
    const calculateProgress = () => {
      const completedSteps = steps.filter(
        (step) => step.status === OnboardingStatus.completed,
      ).length;
      return (completedSteps / steps.length) * 100;
    };

    if (localStorage.getItem("onboardingData")) {
      const data = JSON.parse(localStorage.getItem("onboardingData"));
      setFormData(data || {});
      setProgress(calculateProgress());
    } else {
      setProgress(calculateProgress());
    }
  }, [currentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (
    item: string,
    field: "goals" | "allergies" | "dislikes",
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter((i: string) => i !== item)
        : [...prev[field], item],
    }));
  };

  const handleCuisinePreference = (
    cuisine: string,
    preference: "like" | "dislike",
  ) => {
    setFormData((prev) => ({
      ...prev,
      cuisinePreferences: {
        ...prev.cuisinePreferences,
        [cuisine]:
          preference === prev.cuisinePreferences[cuisine] ? null : preference,
      },
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      steps[currentStep].status = OnboardingStatus.completed;
      setCurrentStep(currentStep + 1);
      setProgress(((currentStep + 1) / steps.length) * 100);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      steps[currentStep].status = OnboardingStatus.notStarted;
      setCurrentStep((prev) => prev - 1);
      setProgress(((currentStep - 1) / steps.length) * 100);
    }
  };

  const handleFinish = () => {
    localStorage.setItem("profileData", JSON.stringify(formData));
    localStorage.removeItem("onboardingData");
    setIsOnboardingComplete(true);
    navigateWithState("/home");
  };

  const handleExit = () => {
    if (
      window.confirm(
        "Are you sure you want to exit? Your progress will be saved.",
      )
    ) {
      localStorage.setItem("onboardingData", JSON.stringify(formData));
      navigateWithState("/home");
    }
  };

  const renderOption = (
    value,
    label,
    description = "",
    isChecked,
    onChange,
  ) => (
    <div
      key={value}
      className={`${styles.onboardingOption} ${isChecked ? styles.selected : ""}`}
      onClick={() => onChange(value)}
    >
      <input
        type="radio"
        value={value}
        id={value}
        checked={isChecked}
        onChange={() => onChange(value)}
        className={styles.onboardingRadio}
      />
      <label htmlFor={value} className={styles.onboardingLabel}>
        <span className={styles.onboardingLabelTitle}>{label}</span>
        {description && (
          <span className={styles.onboardingLabelDescription}>
            {description}
          </span>
        )}
      </label>
    </div>
  );

  const RenderStepPage = ({
    title,
    description,
    children,
  }: PropsRenderStep) => {
    return (
      <div>
        <h2>{title}</h2>
        <p className={styles.description}>{description}</p>
        {children}
      </div>
    );
  };

  const renderStep = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case "intro":
        return (
          <RenderStepPage title={step.title} description={step.description} />
        );

      case "goals":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            {[
              "Lose weight",
              "Hit my macros",
              "Eat healthy",
              "Gain weight",
              "Save time",
            ].map((goal) => (
              <button
                key={goal}
                className={`${styles.onboardingButton} ${formData.goals.includes(goal) ? styles.selected : ""}`}
                onClick={() => handleMultiSelect(goal, "goals")}
              >
                {goal}
              </button>
            ))}
          </RenderStepPage>
        );

      case "sex":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            {renderOption(
              "female",
              "Female",
              "",
              formData.sex === "female",
              (value) => setFormData((prev) => ({ ...prev, sex: value })),
            )}
            {renderOption(
              "male",
              "Male",
              "",
              formData.sex === "male",
              (value) => setFormData((prev) => ({ ...prev, sex: value })),
            )}
          </RenderStepPage>
        );

      case "age":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter your age"
              className={styles.onboardingNumberInput}
            />
          </RenderStepPage>
        );

      case "height":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="Enter your height in cm"
              className={styles.onboardingNumberInput}
            />
          </RenderStepPage>
        );

      case "current-weight":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            <input
              type="number"
              name="currentWeight"
              value={formData.currentWeight}
              onChange={handleInputChange}
              placeholder="Enter your weight in kg"
              className={styles.onboardingNumberInput}
            />
          </RenderStepPage>
        );

      case "goal-weight":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            <input
              type="number"
              name="goalWeight"
              value={formData.goalWeight}
              onChange={handleInputChange}
              placeholder="Enter your goal weight in kg"
              className={styles.onboardingNumberInput}
            />
          </RenderStepPage>
        );

      case "motivation":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            {renderOption(
              "very-motivated",
              "Very motivated",
              "Ready for big changes",
              formData.motivation === "very-motivated",
              (value) =>
                setFormData((prev) => ({ ...prev, motivation: value })),
            )}
            {renderOption(
              "willing-to-give-it-a-go",
              "Willing to give it a go",
              "Prefer moderate changes",
              formData.motivation === "willing-to-give-it-a-go",
              (value) =>
                setFormData((prev) => ({ ...prev, motivation: value })),
            )}
            {renderOption(
              "small-changes-are-best",
              "Small changes are best",
              "Prefer to take things step by step",
              formData.motivation === "small-changes-are-best",
              (value) =>
                setFormData((prev) => ({ ...prev, motivation: value })),
            )}
            {renderOption(
              "not-ready-yet",
              "Not ready yet",
              "",
              formData.motivation === "not-ready-yet",
              (value) =>
                setFormData((prev) => ({ ...prev, motivation: value })),
            )}
          </RenderStepPage>
        );

      case "activity":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            {renderOption(
              "sedentary",
              "Sedentary",
              "No exercise, desk job",
              formData.activityLevel === "sedentary",
              (value) =>
                setFormData((prev) => ({ ...prev, activityLevel: value })),
            )}
            {renderOption(
              "light-exercise",
              "Light exercise",
              "1-2 days per week",
              formData.activityLevel === "light-exercise",
              (value) =>
                setFormData((prev) => ({ ...prev, activityLevel: value })),
            )}
            {renderOption(
              "moderate-exercise",
              "Moderate exercise",
              "3-5 days per week",
              formData.activityLevel === "moderate-exercise",
              (value) =>
                setFormData((prev) => ({ ...prev, activityLevel: value })),
            )}
            {renderOption(
              "heavy-exercise",
              "Heavy exercise",
              "6-7 days per week",
              formData.activityLevel === "heavy-exercise",
              (value) =>
                setFormData((prev) => ({ ...prev, activityLevel: value })),
            )}
            {renderOption(
              "athlete",
              "Athlete",
              "Daily exercise or heavy labor",
              formData.activityLevel === "athlete",
              (value) =>
                setFormData((prev) => ({ ...prev, activityLevel: value })),
            )}
          </RenderStepPage>
        );

      case "mindset":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            {renderOption(
              "agree",
              "Agree",
              "",
              formData.mindset === "agree",
              (value) => setFormData((prev) => ({ ...prev, mindset: value })),
            )}
            {renderOption(
              "neutral",
              "Neutral",
              "",
              formData.mindset === "neutral",
              (value) => setFormData((prev) => ({ ...prev, mindset: value })),
            )}
            {renderOption(
              "disagree",
              "Disagree",
              "",
              formData.mindset === "disagree",
              (value) => setFormData((prev) => ({ ...prev, mindset: value })),
            )}
          </RenderStepPage>
        );

      case "speed":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            <div className={styles.onboardingSlider}>
              <span>🐢</span>
              <Slider
                defaultValue={[1]}
                max={3}
                step={1}
                onValueChange={(value) => {
                  const speedMap = ["slow", "moderate", "fast"];
                  setFormData((prev) => ({
                    ...prev,
                    speed: speedMap[value[0] - 1],
                  }));
                }}
              />
              <span>⚡</span>
            </div>
            <p className={styles.onboardingSpeedLabel}>
              {formData.speed.charAt(0).toUpperCase() + formData.speed.slice(1)}
            </p>
            <p className={styles.onboardingSpeedDescription}>
              {formData.speed === "slow" && "Sustainable and gradual pace"}
              {formData.speed === "moderate" && "Sustainable and moderate pace"}
              {formData.speed === "fast" && "Ambitious and quick pace"}
            </p>
          </RenderStepPage>
        );

      case "diet-plan":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            {[
              {
                name: "Balanced",
                description: "Flexible approach, thoughtful portions",
              },
              { name: "Pescatarian", description: "Seafood, healthy fats" },
              { name: "Flexitarian", description: "Less meat, heart-healthy" },
              {
                name: "Vegetarian",
                description: "Clean eating, complex carbs",
              },
              { name: "Low carb", description: "Reduced carbohydrate intake" },
              { name: "Keto", description: "High fat, very low carb" },
            ].map((diet) =>
              renderOption(
                diet.name.toLowerCase(),
                diet.name,
                diet.description,
                formData.dietPlan === diet.name.toLowerCase(),
                (value) =>
                  setFormData((prev) => ({ ...prev, dietPlan: value })),
              ),
            )}
          </RenderStepPage>
        );

      case "past-experience":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            {renderOption(
              "no-past-experience",
              "No past experience",
              "Trying to make changes for the first time",
              formData.pastExperience === "no-past-experience",
              (value) =>
                setFormData((prev) => ({ ...prev, pastExperience: value })),
            )}
            {renderOption(
              "tried-before",
              "Tried before",
              "Giving healthy eating another shot",
              formData.pastExperience === "tried-before",
              (value) =>
                setFormData((prev) => ({ ...prev, pastExperience: value })),
            )}
          </RenderStepPage>
        );

      case "format":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            {renderOption(
              "dinners",
              "Dinners",
              "A few dinner ideas every week",
              formData.format === "dinners",
              (value) => setFormData((prev) => ({ ...prev, format: value })),
            )}
            {renderOption(
              "lunches-and-dinners",
              "Lunches and dinners",
              "Make lunch and dinner most days",
              formData.format === "lunches-and-dinners",
              (value) => setFormData((prev) => ({ ...prev, format: value })),
            )}
            {renderOption(
              "every-meal",
              "Every meal",
              "Make breakfast, lunch, dinner every day",
              formData.format === "every-meal",
              (value) => setFormData((prev) => ({ ...prev, format: value })),
            )}
            {renderOption(
              "custom",
              "Custom",
              "",
              formData.format === "custom",
              (value) => setFormData((prev) => ({ ...prev, format: value })),
            )}
          </RenderStepPage>
        );

      case "allergies":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            {allergies.map((allergy) => (
              <div key={allergy} className={styles.onboardingToggleItem}>
                <label htmlFor={allergy}>{allergy}</label>
                <ToggleSwitch
                  checked={formData.allergies.includes(allergy)}
                  onCheckedChange={() =>
                    handleMultiSelect(allergy, "allergies")
                  }
                />
              </div>
            ))}
            <p className={styles.onboardingNote}>
              If you have other allergies or restrictions that aren't listed
              here, you can add them as a "dislike" on the next page! Any
              recipes that contain a disliked ingredient will not be recommended
              to you.
            </p>
          </RenderStepPage>
        );

      case "dislikes":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            <input
              type="text"
              placeholder="Add a food you dislike"
              onChange={(e) => {
                const value = e.target.value.toLowerCase();
                console.log("Searching for:", value);
              }}
              className={styles.onboardingSearchInput}
            />
            <h4>Common Dislikes</h4>
            <div className={styles.onboardingCommonItems}>
              {commonDislikes.map((dislike) => (
                <button
                  key={dislike}
                  className={`${styles.onboardingButton} ${formData.dislikes.includes(dislike) ? styles.selected : ""}`}
                  onClick={() => handleMultiSelect(dislike, "dislikes")}
                >
                  {dislike}
                </button>
              ))}
            </div>
          </RenderStepPage>
        );

      case "cuisines":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            {cuisines.map((cuisine) => (
              <div key={cuisine} className={styles.onboardingCuisineItem}>
                <span>{cuisine}</span>
                <div className={styles.onboardingCuisineButtons}>
                  <button
                    className={`${styles.onboardingButton} ${formData.cuisinePreferences[cuisine] === "dislike" ? styles.selected : ""}`}
                    onClick={() => handleCuisinePreference(cuisine, "dislike")}
                  >
                    👎
                  </button>
                  <button
                    className={`${styles.onboardingButton} ${formData.cuisinePreferences[cuisine] === "like" ? styles.selected : ""}`}
                    onClick={() => handleCuisinePreference(cuisine, "like")}
                  >
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </RenderStepPage>
        );

      case "pantry":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            {[
              {
                value: "empty",
                label: "Empty",
                description: "Don't have anything",
              },
              {
                value: "basic",
                label: "Basic",
                description: "Only have oil, salt, and pepper",
              },
              {
                value: "average",
                label: "Average",
                description: "Have common spices and seasonings",
              },
              {
                value: "well-stocked",
                label: "Well-stocked",
                description: "Have a wide selection of spices and seasonings",
              },
            ].map((option) =>
              renderOption(
                option.value,
                option.label,
                option.description,
                formData.pantry === option.value,
                (value) => setFormData((prev) => ({ ...prev, pantry: value })),
              ),
            )}
          </RenderStepPage>
        );

      case "cooking-skills":
        return (
          <RenderStepPage title={step.title} description={step.description}>
            {[
              {
                value: "novice",
                label: "Novice",
                description: '"I can cook boxed mac and cheese"',
              },
              {
                value: "basic",
                label: "Basic",
                description: '"I only cook simple recipes"',
              },
              {
                value: "intermediate",
                label: "Intermediate",
                description: '"I routinely try new recipes"',
              },
              {
                value: "advanced",
                label: "Advanced",
                description: '"I\'m comfortable cooking any recipe"',
              },
            ].map((option) =>
              renderOption(
                option.value,
                option.label,
                option.description,
                formData.cookingSkills === option.value,
                (value) =>
                  setFormData((prev) => ({ ...prev, cookingSkills: value })),
              ),
            )}
          </RenderStepPage>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.onboardingContainer}>
      <div className={styles.onboardingHeader}>
        <Button
          color="secondary"
          onClick={handleExit}
          className={styles.onboardingExitButton}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          <span className={styles.exitIcon}>×</span>
        </Button>
      </div>
      <div className={styles.onboardingContent}>
        <div className={styles.onboardingStep}>{renderStep()}</div>
      </div>
      <div className={styles.onboardingNavigation}>
        <ProgressBar value={progress} className={styles.onboardingProgress} />
        <div className={styles.onboardingButtons}>
          <Button
            color="secondary"
            onClick={handleBack}
            className={styles.navButton}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button
              color="primary"
              onClick={handleNext}
              className={styles.navButton}
            >
              Next
            </Button>
          ) : (
            <Button
              color="primary"
              onClick={handleFinish}
              className={styles.navButton}
            >
              Finish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
