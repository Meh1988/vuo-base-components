import {
  allergies,
  commonDislikes,
  cuisines,
  initialOnboardingData,
  steps,
} from "@constants/Onboarding";

import { Modal } from "@vuo/molecules/Modal";

import { FormData, OnboardingStatus } from "@models/Onboarding";
import Button from "@vuo/atoms/Button";
import ProgressBar from "@vuo/atoms/ProgressBar";
import Slider from "@vuo/atoms/Slider";
import { useAppContext } from "@vuo/context/AppContext";
import useStackNavigator from "@vuo/hooks/StackNavigator";
import ToggleSwitch from "@vuo/molecules/ToggleSwitch";

// Adjust the import path accordingly
import { useEffect, useState } from "react";
import styles from "./Onboarding.module.scss";
import {
  cookingSkills,
  dietsPlan,
  goals,
  pantry,
} from "./constants/OnboardingSteps";

// TODO add the status of the steps to the formData object, (you may need to modify the rendering of the steps)
const OnboardingFlow = () => {
  const { goBack } = useStackNavigator();

  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExitOnboarding, setIsExitOnboarding] = useState(false);
  const { setIsOnboardingComplete } = useAppContext();

  const [formData, setFormData] = useState<FormData>(initialOnboardingData);

  useEffect(() => {
    const storedProfile = localStorage.getItem("profileData");
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setFormData(parsedProfile);
    }
  }, []);

  useEffect(() => {
    const calculateProgress = () => {
      const completedSteps = steps.filter(
        (step) => step.status === OnboardingStatus.completed,
      ).length;
      return (completedSteps / steps.length) * 100;
    };

    setProgress(calculateProgress());
  }, [currentStep]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (item: string, field: keyof FormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string).includes(item)
        ? (prev[field] as string[]).filter((i: string) => i !== item)
        : [...(prev[field] as string[]), item],
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
    goBack();
  };

  const FooterContent = () => (
    <>
      <Button variant="small" color="tertiary" onClick={() => goBack()}>
        Exit
      </Button>
      <Button
        variant="small"
        color="primary"
        onClick={() => setIsExitOnboarding(false)}
      >
        Cancel
      </Button>
    </>
  );

  const renderOption = (
    value: string,
    label: string,
    description = "",
    isChecked: boolean,
    onChange: (value: string) => void,
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

  const renderStep = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case "intro":
        return (
          <div className={styles.onboardingStepPage}>
            <h1>{step.title}</h1>
            <p className={styles.description}>{step.description}</p>
          </div>
        );

      case "userName":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className={styles.onboardingInput}
            />
          </>
        );

      case "goals":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
            {goals.map((goal) => (
              <button
                key={goal}
                type="button"
                className={`${styles.onboardingButton} ${formData.goals.includes(goal) ? styles.selected : ""}`}
                onClick={() => handleMultiSelect(goal, "goals")}
              >
                {goal}
              </button>
            ))}
          </>
        );

      case "sex":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
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
          </>
        );

      case "age":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter your age"
              className={styles.onboardingInput}
            />
          </>
        );

      case "height":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              placeholder="Enter your height in cm"
              className={styles.onboardingInput}
            />
          </>
        );

      case "current-weight":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
            <input
              type="number"
              name="currentWeight"
              value={formData.currentWeight}
              onChange={handleInputChange}
              placeholder="Enter your weight in kg"
              className={styles.onboardingInput}
            />
          </>
        );

      case "goal-weight":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
            <input
              type="number"
              name="goalWeight"
              value={formData.goalWeight}
              onChange={handleInputChange}
              placeholder="Enter your goal weight in kg"
              className={styles.onboardingInput}
            />
          </>
        );

      case "motivation":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
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
          </>
        );

      case "activity":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
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
          </>
        );

      case "mindset":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
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
          </>
        );

      case "speed":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
            <div className={styles.onboardingSlider}>
              <span>🐢</span>
              <Slider
                defaultValue={1}
                min={0}
                max={2}
                step={1}
                onChange={(value: number) => {
                  const speedMap = ["slow", "moderate", "fast"];
                  setFormData((prev) => ({
                    ...prev,
                    speed: speedMap[value],
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
          </>
        );

      case "diet-plan":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
            {dietsPlan.map((diet) =>
              renderOption(
                diet.name.toLowerCase(),
                diet.name,
                diet.description,
                formData.dietPlan === diet.name.toLowerCase(),
                (value) =>
                  setFormData((prev) => ({ ...prev, dietPlan: value })),
              ),
            )}
          </>
        );

      case "past-experience":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
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
          </>
        );

      case "format":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
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
          </>
        );

      case "allergies":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
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
              If you have other allergies or restrictions that aren&apos;t
              listed here, you can add them as a &ldquo;dislike&rdquo; on the
              next page! Any recipes that contain a disliked ingredient will not
              be recommended to you.
            </p>
          </>
        );

      case "dislikes":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
            <input
              type="text"
              placeholder="Add a food you dislike"
              className={styles.onboardingInput}
            />
            <h4>Common Dislikes</h4>
            <div className={styles.onboardingCommonItems}>
              {commonDislikes.map((dislike) => (
                <button
                  type="button"
                  key={dislike}
                  className={`${styles.onboardingButton} ${formData.dislikes.includes(dislike) ? styles.selected : ""}`}
                  onClick={() => handleMultiSelect(dislike, "dislikes")}
                >
                  {dislike}
                </button>
              ))}
            </div>
          </>
        );

      case "cuisines":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
            {cuisines.map((cuisine) => (
              <div key={cuisine} className={styles.onboardingCuisineItem}>
                <span>{cuisine}</span>
                <div className={styles.onboardingCuisineButtons}>
                  <button
                    type="button"
                    className={`${styles.onboardingButton} ${formData.cuisinePreferences[cuisine] === "dislike" ? styles.selected : ""}`}
                    onClick={() => handleCuisinePreference(cuisine, "dislike")}
                  >
                    👎
                  </button>
                  <button
                    type="button"
                    className={`${styles.onboardingButton} ${formData.cuisinePreferences[cuisine] === "like" ? styles.selected : ""}`}
                    onClick={() => handleCuisinePreference(cuisine, "like")}
                  >
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </>
        );

      case "pantry":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
            {pantry.map((option) =>
              renderOption(
                option.value,
                option.label,
                option.description,
                formData.pantry === option.value,
                (value) => setFormData((prev) => ({ ...prev, pantry: value })),
              ),
            )}
          </>
        );

      case "cooking-skills":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
            {cookingSkills.map((option) =>
              renderOption(
                option.value,
                option.label,
                option.description,
                formData.cookingSkills === option.value,
                (value) =>
                  setFormData((prev) => ({ ...prev, cookingSkills: value })),
              ),
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.onboardingContainer}>
        <div className={styles.onboardingHeader}>
          <Button
            color="secondary"
            onClick={() => setIsExitOnboarding(true)}
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

      {isExitOnboarding && (
        <Modal
          title="Exit onboarding?"
          isOpen={isExitOnboarding}
          footerContent={<FooterContent />}
        >
          <p>Are you sure you want to exit? Your progress will not be saved.</p>
        </Modal>
      )}
    </>
  );
};

export default OnboardingFlow;
