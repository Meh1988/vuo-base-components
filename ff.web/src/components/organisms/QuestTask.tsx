import { useState } from "react";
import { PlayerQuestStep, StepState } from "@vuo/models/PlayerQuest";
import { HighlightType } from "@vuo/models/Step";
import { AISparklesSVG, ChevronSVG, LoadingCircleSVG } from "@vuo/atoms/SVGComponents";
import Chip from "../atoms/Chip";
import Button from "../atoms/Button";
import InfoCard from "../molecules/InfoCard";
import Space from "../atoms/Space";
import styles from "./QuestTask.module.scss";

export type QuestTaskProps = {
  step: PlayerQuestStep;
  currentStep: boolean;
  hideClaimButton?: boolean;
  onStepDone?: (step: PlayerQuestStep) => void;
  onStepClaimed?: (step: PlayerQuestStep) => void;
  onChallengeAccepted?: (step: PlayerQuestStep) => void;
  onPrepPalPress?: (step: PlayerQuestStep) => void;
};

function QuestTask(props: QuestTaskProps) {
  const { currentStep, hideClaimButton, step, onChallengeAccepted, onStepDone, onStepClaimed, onPrepPalPress } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPrepPalOpen, setIsPrepPalOpen] = useState<boolean>(false);

  const expand = isOpen || currentStep;
  const showButton = step.state !== StepState.completed;
  const hasXp = step?.skills?.length && step?.skills[0]?.challenge_rating

  function handleExpand() {
    if (step.state === StepState.completed) {
      setIsOpen(!isOpen);
    }
  }

  function handlePrepPalOpen() {
    setIsPrepPalOpen(!isPrepPalOpen);
  }

  function handlePrepPalPress() {
    handlePrepPalOpen();
    onPrepPalPress?.(step);
  }

  function injectResourceToStepText(pqStep: PlayerQuestStep): string | undefined {
    if (!pqStep.resources || !pqStep.text) {
      return undefined;
    }

    return pqStep.resources.reduce((text, resource, index) => {
      const placeholder = `\${QUANTITY${index}}`;
      return text.replace(placeholder, resource.quantity.toString());
    }, pqStep.text);
  }

  const stepClassName = currentStep ? styles.current : styles.notCurrent;
  const isHighlighted = step?.highlight === HighlightType.Challenge

  const PrepPalButton = (
    <button
      type="button"
      onClick={handlePrepPalPress}
      className={styles.prep_pal_button}
    >
      <div className={styles.prep_pal_button_text}>
        {/* If prep pal is open, it means that it is loading an answer */}
        {isPrepPalOpen ? "Close" : "Too Difficult? Break down steps"}
      </div>
      <div className={styles.prep_pal_button_icon}>
        <AISparklesSVG color="var(--text-secondary)" />
      </div>
    </button>
  )

  const ExpandButton = (
    <button
      type="button"
      onClick={handlePrepPalOpen}
      className={styles.prep_pal_button}
    >
      <div className={styles.prep_pal_button_text}>
        {isPrepPalOpen ? "Close" : "Too Difficult? See broken down steps"}
      </div>
      <div className={styles.prep_pal_button_icon}>
        <ChevronSVG 
          color="var(--text-secondary)" 
          direction={isPrepPalOpen ? "up" : "down"} 
          style={{
            transition: "transform 0.2s ease-in-out"
          }}
        />
      </div>
    </button>
  )

  return (
    <div
      className={`${styles.step} ${stepClassName} ${isHighlighted && styles.highlight}`}
      onClick={handleExpand}
      onKeyDown={handleExpand}
      role="button"
      tabIndex={0}
    >
      <Chip
        className={styles.skill_chip}>
        {step.state === StepState.completed ? "Done" : (step?.skills?.[0]?.name || "")}
      </Chip>

      {step.claimedBy?.username && (
        <Chip className={styles.player_chip}>
          {step.claimedBy?.username}
        </Chip>
      )}
      <div style={{ paddingTop: hasXp ? "18px" : "0" }}>
        {expand && (
          <div>
            {step.media?.video && (
              <video
                className={styles.step_video}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                controlsList="nofullscreen"
              >
                <source
                  src={step.media.video}
                  type="video/mp4"
                />
                <track
                  kind="captions"
                  label="No captions"
                  srcLang="en"
                  default
                />
              </video>
            )}
            {step.media?.image && !step.media.video && (
              <div>
                <img
                  alt="step_image"
                  className={styles.step_image}
                  src={step.media.image}
                />
              </div>
            )}
          </div>
        )}

        <div>
          <div className={styles.step_content}>
            <div
              className={styles.step_text}
            // DOMPurify sanitizes the string and prevents XSS attacks
            // eslint-disable-next-line react/no-danger
            // dangerouslySetInnerHTML={{
            //   __html: DOMPurify.sanitize(
            //     step.resources && step.resources.length > 0
            //       ? injectResourceToStepText(step) || ""
            //       : step.text
            //   )
            // }}
            >
              {injectResourceToStepText(step)}
            </div>
            <div className={styles.preppal_container}>
              {currentStep && step.highlight !== HighlightType.Challenge && (step.subSteps?.length && step.subSteps?.length > 0 ? ExpandButton : PrepPalButton)}
              {currentStep && step.highlight !== HighlightType.Challenge && step.subSteps?.length === 0 && (
                <div className={`${styles.prep_pal_steps} ${styles.prep_pal_steps_loading}  ${isPrepPalOpen ? styles.open : styles.closed}`}>
                  <LoadingCircleSVG style={{ width: "48px", height: "48px" }} />
                  <p>Creating simpler steps with AI!</p>
              </div>
              )}
              {currentStep && step.highlight !== HighlightType.Challenge && Array.isArray(step.subSteps) && (
                <div className={`${styles.prep_pal_steps} ${isPrepPalOpen && step.subSteps.length > 0 ? styles.open : styles.closed}`}>
                  <ul>
                    {step.subSteps.map((subStep) => (
                        <li key={subStep.id}>- {subStep.text}</li>
                      ))}
                    </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {expand && (
          <Space
            direction="vertical"
            style={{ width: "100%", "--gap-vertical": "18px" }}
          >
            <div className="flex gap-16" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {step.tools && step.tools.length > 0 && (
                <InfoCard
                  title="Tools"
                  items={step.tools.map((tool) => ({
                    icon: tool.icon,
                    title: tool.name,
                  }))}
                />
              )}
              {step.resources && step.resources.length > 0 && (
                <InfoCard
                  title="Ingredients"
                  items={step.resources.map((resource) => ({
                    icon: "ingredient",
                    title: `${resource.quantity} ${resource.unit} ${resource.name} `,
                  }))}
                />
              )}
            </div>
            {showButton && (
              step.highlight === HighlightType.Challenge ? (
                <div className={styles.challenge_buttons}>
                  <Button
                    className="btn btn-large btn-raised flex-one"
                    onClick={() => onStepDone?.(step)}
                  >
                    Skip...
                  </Button>
                  <Button
                    className="btn btn-blue btn-large btn-raised flex-one"
                    color="primary"
                    onClick={() => onChallengeAccepted?.(step)}
                  >
                    Yes!
                  </Button>
                </div>
              ) : (
                <Button
                  block
                  style={{ width: '100%' }}
                  color="primary"
                  onClick={() => onStepDone?.(step)}
                >
                  Done!
                </Button>
              )
            )}
          </Space>
        )}
        {!step.claimedBy && !hideClaimButton && (
          <Button
            block
            className="btn btn-large btn-raised"
            onClick={() => onStepClaimed?.(step)}
          >
            Claim!
          </Button>
        )}
      </div>
    </div >
  );
}

export default QuestTask;
