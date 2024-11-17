import {
  allergies,
  commonDislikes,
  cuisines,
  steps,
} from "@constants/Onboarding";

import { Modal } from "@vuo/molecules/Modal";
import { observer } from "mobx-react-lite";

import Button from "@vuo/atoms/Button";
import ProgressBar from "@vuo/atoms/ProgressBar";
import Slider from "@vuo/atoms/Slider";
import useStackNavigator from "@vuo/hooks/StackNavigator";
import ToggleSwitch from "@vuo/molecules/ToggleSwitch";

// Adjust the import path accordingly
import OnboardingViewModel from "@viewModels/OnboardingViewModel";
import { useEffect, useState } from "react";
import styles from "./Onboarding.module.scss";
import {
  cookingSkills,
  dietsPlan,
  goals,
  pantry,
} from "./constants/OnboardingSteps";

// TODO add the status of the steps to the formData object, (you may need to modify the rendering of the steps)
const OnboardingFlow = observer(() => {
  const { navigateWithState } = useStackNavigator();
  const [viewModel] = useState(() => new OnboardingViewModel());

  useEffect(() => {
    const sessionDataString = localStorage.getItem("SessionDataStore");
    if (!sessionDataString) return;

    const sessionData = JSON.parse(sessionDataString);
    if (sessionData?.user?.id) {
      viewModel.handleInputChange({
        target: { name: "userId", value: sessionData.user.id },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [viewModel]);

  const FooterContent = () => (
    <>
      <Button
        variant="small"
        color="tertiary"
        onClick={() => {
          localStorage.setItem(
            "onboardingData",
            JSON.stringify(viewModel.formData),
          );
          navigateWithState("/home");
        }}
      >
        Exit
      </Button>
      <Button
        variant="small"
        color="primary"
        onClick={() => viewModel.setIsExitOnboarding(false)}
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
    const step = steps[viewModel.currentStep];

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
              value={viewModel.formData.userName}
              onChange={viewModel.handleInputChange}
              placeholder="Enter your name"
              className={styles.onboardingInput}
            />
          </>
        );

      case "userId":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
            <input
              type="text"
              name="userId"
              value={viewModel.formData.userId}
              onChange={viewModel.handleInputChange}
              placeholder="Enter your user ID"
              className={styles.onboardingInput}
            />
          </>
        );

      case "description":
        return (
          <>
            <div className={styles.onboardingStepPage}>
              <h1>{step.title}</h1>
              <p className={styles.description}>{step.description}</p>
            </div>
            <textarea
              name="description"
              value={viewModel.formData.description}
              onChange={viewModel.handleInputChange}
              placeholder="Enter your description"
              className={`${styles.onboardingInput} ${styles.onboardingInputTextarea}`}
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
                type="button"
                key={goal}
                className={`${styles.onboardingButton} ${viewModel.formData.goals.includes(goal) ? styles.selected : ""}`}
                onClick={() => viewModel.handleMultiSelect(goal, "goals")}
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
              viewModel.formData.sex === "female",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "sex", value },
                } as React.ChangeEvent<HTMLInputElement>),
            )}
            {renderOption(
              "male",
              "Male",
              "",
              viewModel.formData.sex === "male",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "sex", value },
                } as React.ChangeEvent<HTMLInputElement>),
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
              value={viewModel.formData.age}
              onChange={(e) =>
                viewModel.handleInputChange(
                  e as unknown as React.ChangeEvent<HTMLInputElement>,
                )
              }
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
              value={viewModel.formData.height}
              onChange={(e) =>
                viewModel.handleInputChange(
                  e as unknown as React.ChangeEvent<HTMLInputElement>,
                )
              }
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
              value={viewModel.formData.currentWeight}
              onChange={viewModel.handleInputChange}
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
              value={viewModel.formData.goalWeight}
              onChange={viewModel.handleInputChange}
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
              viewModel.formData.motivation === "very-motivated",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "motivation", value },
                } as React.ChangeEvent<HTMLInputElement>),
            )}
            {renderOption(
              "willing-to-give-it-a-go",
              "Willing to give it a go",
              "Prefer moderate changes",
              viewModel.formData.motivation === "willing-to-give-it-a-go",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "motivation", value },
                } as React.ChangeEvent<HTMLInputElement>),
            )}
            {renderOption(
              "small-changes-are-best",
              "Small changes are best",
              "Prefer to take things step by step",
              viewModel.formData.motivation === "small-changes-are-best",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "motivation", value },
                } as React.ChangeEvent<HTMLInputElement>),
            )}
            {renderOption(
              "not-ready-yet",
              "Not ready yet",
              "",
              viewModel.formData.motivation === "not-ready-yet",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "motivation", value },
                } as React.ChangeEvent<HTMLInputElement>),
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
              viewModel.formData.activityLevel === "sedentary",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "activityLevel", value },
                } as React.ChangeEvent<HTMLInputElement>),
            )}
            {renderOption(
              "light-exercise",
              "Light exercise",
              "1-2 days per week",
              viewModel.formData.activityLevel === "light-exercise",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "activityLevel", value },
                } as React.ChangeEvent<HTMLInputElement>),
            )}
            {renderOption(
              "moderate-exercise",
              "Moderate exercise",
              "3-5 days per week",
              viewModel.formData.activityLevel === "moderate-exercise",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "activityLevel", value },
                } as React.ChangeEvent<HTMLInputElement>),
            )}
            {renderOption(
              "heavy-exercise",
              "Heavy exercise",
              "6-7 days per week",
              viewModel.formData.activityLevel === "heavy-exercise",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "activityLevel", value },
                } as React.ChangeEvent<HTMLInputElement>),
            )}
            {renderOption(
              "athlete",
              "Athlete",
              "Daily exercise or heavy labor",
              viewModel.formData.activityLevel === "athlete",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "activityLevel", value },
                } as React.ChangeEvent<HTMLInputElement>),
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
              viewModel.formData.mindset === "agree",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "mindset", value },
                } as React.ChangeEvent<HTMLInputElement>),
            )}
            {renderOption(
              "neutral",
              "Neutral",
              "",
              viewModel.formData.mindset === "neutral",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "mindset", value },
                } as React.ChangeEvent<HTMLInputElement>),
            )}
            {renderOption(
              "disagree",
              "Disagree",
              "",
              viewModel.formData.mindset === "disagree",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "mindset", value },
                } as React.ChangeEvent<HTMLInputElement>),
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
                  viewModel.handleInputChange({
                    target: {
                      name: "speed",
                      value: value.toString(),
                    },
                  } as unknown as React.ChangeEvent<HTMLInputElement>);
                }}
              />
              <span>⚡</span>
            </div>
            <p className={styles.onboardingSpeedLabel}>
              {viewModel.formData.speed.charAt(0).toUpperCase() +
                viewModel.formData.speed.slice(1)}
            </p>
            <p className={styles.onboardingSpeedDescription}>
              {viewModel.formData.speed === "slow" &&
                "Sustainable and gradual pace"}
              {viewModel.formData.speed === "moderate" &&
                "Sustainable and moderate pace"}
              {viewModel.formData.speed === "fast" &&
                "Ambitious and quick pace"}
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
                viewModel.formData.dietPlan === diet.name.toLowerCase(),
                (value) =>
                  viewModel.handleInputChange({
                    target: { name: "dietPlan", value },
                  } as React.ChangeEvent<HTMLInputElement>),
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
              viewModel.formData.pastExperience === "no-past-experience",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "pastExperience", value },
                } as React.ChangeEvent<HTMLInputElement>),
            )}
            {renderOption(
              "tried-before",
              "Tried before",
              "Giving healthy eating another shot",
              viewModel.formData.pastExperience === "tried-before",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "pastExperience", value },
                } as React.ChangeEvent<HTMLInputElement>),
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
              viewModel.formData.format === "dinners",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "format", value },
                } as React.ChangeEvent<HTMLInputElement>),
            )}
            {renderOption(
              "lunches-and-dinners",
              "Lunches and dinners",
              "Make lunch and dinner most days",
              viewModel.formData.format === "lunches-and-dinners",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "format", value },
                } as React.ChangeEvent<HTMLInputElement>),
            )}
            {renderOption(
              "every-meal",
              "Every meal",
              "Make breakfast, lunch, dinner every day",
              viewModel.formData.format === "every-meal",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "format", value },
                } as React.ChangeEvent<HTMLInputElement>),
            )}
            {renderOption(
              "custom",
              "Custom",
              "",
              viewModel.formData.format === "custom",
              (value) =>
                viewModel.handleInputChange({
                  target: { name: "format", value },
                } as React.ChangeEvent<HTMLInputElement>),
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
                  checked={viewModel.formData.allergies.includes(allergy)}
                  onCheckedChange={() =>
                    viewModel.handleMultiSelect(allergy, "allergies")
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
                  className={`${styles.onboardingButton} ${viewModel.formData.dislikes.includes(dislike) ? styles.selected : ""}`}
                  onClick={() =>
                    viewModel.handleMultiSelect(dislike, "dislikes")
                  }
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
                    className={`${styles.onboardingButton} ${viewModel.formData.cuisinePreferences[cuisine] === "dislike" ? styles.selected : ""}`}
                    onClick={() =>
                      viewModel.handleCuisinePreference(cuisine, "dislike")
                    }
                  >
                    👎
                  </button>
                  <button
                    type="button"
                    className={`${styles.onboardingButton} ${viewModel.formData.cuisinePreferences[cuisine] === "like" ? styles.selected : ""}`}
                    onClick={() =>
                      viewModel.handleCuisinePreference(cuisine, "like")
                    }
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
                viewModel.formData.pantry === option.value,
                (value) =>
                  viewModel.handleInputChange({
                    target: { name: "pantry", value },
                  } as React.ChangeEvent<HTMLInputElement>),
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
                viewModel.formData.cookingSkills === option.value,
                (value) =>
                  viewModel.handleInputChange({
                    target: { name: "cookingSkills", value },
                  } as React.ChangeEvent<HTMLInputElement>),
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
            onClick={() => viewModel.setIsExitOnboarding(true)}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <span className={styles.exitIcon}>×</span>
          </Button>
        </div>
        <div className={styles.onboardingContent}>
          <div className={styles.onboardingStep}>{renderStep()}</div>
        </div>
        <div className={styles.onboardingNavigation}>
          <ProgressBar
            value={viewModel.progress}
            className={styles.onboardingProgress}
          />
          <div className={styles.onboardingButtons}>
            <Button
              color="secondary"
              onClick={viewModel.handleBack}
              className={styles.navButton}
              disabled={viewModel.currentStep === 0}
            >
              Back
            </Button>
            {viewModel.currentStep < steps.length - 1 ? (
              <Button
                color="primary"
                onClick={viewModel.handleNext}
                className={styles.navButton}
                disabled={viewModel.loading}
              >
                Next
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={() => {
                  viewModel.handleFinish();
                  navigateWithState("/home");
                }}
                className={styles.navButton}
              >
                Finish
              </Button>
            )}
          </div>
        </div>
      </div>

      {viewModel.isExitOnboarding && (
        <Modal
          title="Exit onboarding?"
          isOpen={viewModel.isExitOnboarding}
          footerContent={<FooterContent />}
        >
          <p>Are you sure you want to exit? Your progress will not be saved.</p>
        </Modal>
      )}
    </>
  );
});

export default OnboardingFlow;
