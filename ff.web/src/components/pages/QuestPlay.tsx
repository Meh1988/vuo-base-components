import { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import TagManager from "react-gtm-module";
import { Howl } from 'howler';

import {
  PlayerQuestState,
  PlayerQuestStep,
  StepState,
} from "@vuo/models/PlayerQuest";
import Page from "@vuo/templates/Page";
import QuestPlayViewModel from "@vuo/viewModels/QuestPlayViewModel";
import doneSoundFile from '@assets/sounds/card_slide.mp3';
import challengeDoneSoundFile from '@assets/sounds/card_shuffle_ding.mp3';
import questDoneSoundFile from '@assets/sounds/mission_completed.mp3'

import QuestTask from "../organisms/QuestTask";
import QuestProgressBar from "../molecules/QuestProgressBar";
import QuestChallenge from "../organisms/QuestChallenge";
// import QuestChallenge from "../organisms/QuestChallenge";

import { analytics } from '../../config/firebase';
import { logEvent } from 'firebase/analytics';

const QuestPlay = observer(() => {
  const { id } = useParams();
  const [viewModel] = useState<QuestPlayViewModel>(
    () => new QuestPlayViewModel(id!),
  );
  const navigate = useNavigate();
  const taskRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  const doneSounds = new Howl({
    src: [doneSoundFile],
    preload: true
  });

  const challengeDoneSound = new Howl({
    src: [challengeDoneSoundFile],
    preload: true
  });

  useEffect(() => {
    const questDoneSound = new Howl({
      src: [questDoneSoundFile],
      preload: true
    });

    if (viewModel.playerQuest?.state === PlayerQuestState.completed) {
      questDoneSound.play()
      navigate(`/home/quests/${viewModel.playerQuest!.id}/outro`);
    }

    const stepId = viewModel.currentStep?.id;
    if (stepId && taskRefs.current[stepId]) {
      const element = taskRefs.current[stepId];
      const container = scrollableContainerRef.current;

      if (element && container) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const offsetTop = elementRect.top - containerRect.top + container.scrollTop;

        container.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }

    if (viewModel.playerQuest) {
      // Track quest start
      logEvent(analytics, 'quest_started', {
        quest_id: viewModel.playerQuest.id,
        quest_name: viewModel.playerQuest.name,
        // player_level: viewModel.playerLevel, // You'll need to add this to your viewModel
        // player_total_xp: viewModel.playerTotalXP, // You'll need to add this to your viewModel
        // is_retry: viewModel.isRetry // You'll need to add this to your viewModel
      });
    }
  }, [
    viewModel.playerQuest?.state,
    viewModel.playerQuest?.id,
    viewModel.currentStep?.id,
    viewModel.playerQuest,
    navigate
  ]);

  const onStepDone = (step: PlayerQuestStep) => {
    viewModel.updateStepState(step.id, StepState.completed);
    doneSounds.play();
  };

  const onStepClaimed = (step: PlayerQuestStep) => {
    viewModel.claimStep(step.id);
  }

  const onChallengeAccepted = (step: PlayerQuestStep) => {
    viewModel.acceptChallenge(step.id);
  }

  const onSubStepDone = (stepId: string) => {
    const currentStep = viewModel.playerQuest?.recipe.steps.find(step =>
      step.subSteps?.some(ss => ss.id === stepId)
    );

    // Check if this is the last uncompleted substep
    const isAllSubstepsCompleted = currentStep?.subSteps?.every(
      ss => ss.id === stepId || ss.state === StepState.completed || ss.state === StepState.skipped
    );

    viewModel.updateSubStepState(stepId);

    // Play different sounds based on completion status
    if (isAllSubstepsCompleted) {
      challengeDoneSound.play();
    } else {
      doneSounds.play();
    }
  }

  const onClose = () => {
    TagManager.dataLayer({
      dataLayer: {
        event: "quest_closed",
        playerQuest: { ...viewModel.playerQuest },
      },
    });
    navigate(-2)
    // const sneakpeekorigin = localStorage.getItem("sneakpeekorigin")
    // if (sneakpeekorigin) {
    //   navigate(`/sneakpeek/${sneakpeekorigin}`)
    //   localStorage.removeItem("sneakpeekorigin")
    // } else {
    //   navigate('/quests')
    // }
  }

  const containerStyles = {
    height: "100vh"
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '8px' }}>
        <QuestProgressBar
          percent={
            (viewModel.currentRecipeProgress.value /
              viewModel.currentRecipeProgress.max) *
            100
          }
          onClose={onClose}
          questName={viewModel.playerQuest?.name}
        />
      </div>
      <div ref={scrollableContainerRef} style={{ flex: 1, overflowY: 'auto' }}>
        <Page>
          {/* {id} */}
          <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {viewModel.playerQuest?.recipe.steps.map((step, index) => {
              const isLastStep = !viewModel.playerQuest?.recipe.steps[index + 1];
              const isCurrentStep = viewModel.currentStep?.id === step.id;

              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    taskRefs.current[step.id] = el!;
                  }}
                  style={{
                    ...(!isLastStep ? {} : containerStyles),
                    paddingTop: isCurrentStep ? "20px" : "0"
                  }}
                >
                  {step.claimedBy && step.claimedBy?.id === viewModel.currentUser?.id && step.state === StepState.challengeAccepted ? (
                    <div>
                      <QuestChallenge
                        steps={step.subSteps || []}
                        onStepDone={onSubStepDone}
                      />
                    </div>
                  ) : (
                    <QuestTask
                      currentStep={isCurrentStep}
                      hideClaimButton={!viewModel.activeMPSession}
                      step={step}
                      onChallengeAccepted={onChallengeAccepted}
                      onStepDone={onStepDone}
                      onStepClaimed={onStepClaimed} 
                      onPrepPalPress={onPrepPalPress}/>
                  )}
                </div>
              );
            })}
          </div>
        </Page>
      </div>
    </div>
  );
});

export default QuestPlay;
