// @ts-nocheck

import { observer } from 'mobx-react-lite';
import Button from "../atoms/Button";
import useStackNavigator from "@vuo/hooks/StackNavigator";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mockProgressionPathData from "@static/mockProgressionPathData";
import { ProgressionPathQuest } from "@vuo/models/ProgressionPathTypes";
import Page from "../templates/Page";
import ProgressionPath from "../organisms/ProgressionPath";
import Section from "../atoms/Section";
import QuestBrowseViewModel from "@vuo/viewModels/QuestBrowseViewModel";
import OnboardingViewModel from "@vuo/viewModels/OnboardingViewModel";
import LoginViewModel from "../../viewModels/LoginViewModel";
import LoginModal from "../organisms/LoginModal";

    
    
const Home = observer(() => {
    const navigate = useNavigate();
    const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([])     
    const { navigateWithState } = useStackNavigator();
    const [viewModel] = useState<QuestBrowseViewModel>(() => new QuestBrowseViewModel());
    const [loginViewModel] = useState<LoginViewModel>(() => new LoginViewModel());
    const [onboardingViewModel] = useState<OnboardingViewModel>(() => new OnboardingViewModel());
    const goToQuest = () => {
        navigateWithState('/home/quests');
    };

    const userAccount = loginViewModel.sessionDataStore?.user;

    const goToOnboading = () => {
        // Add conditional navigation logic
        //creating shadow account
        //check if sessiondatastore has shadowuser account 
        //if yes then navigate to onboarding
        // Save the target route to session storage before navigating
        if (
            userAccount?.shadowAccount === true
        ) {
            navigateWithState('/onboarding');
        } else {
            alert("creating shadow account")
            navigateWithState('/onboarding');
            viewModel.createShadowAccount()
                .then((shadowAccountUserId) => {
                    // use the shadowAccountUserId to create an empty profile
                    viewModel.createUserProfile(shadowAccountUserId)
                })
                .catch((error: Error) => {
                    console.error(error)
                })
                .finally(() => {
                    // TODO handle loading state, then navigatie
                    navigateWithState('/onboarding');
                })
        }
        // if no then

    }

    useEffect(() => {
        const storedCompletedQuestIds = localStorage.getItem('completedQuestIds');
        if (storedCompletedQuestIds) {
            setCompletedQuestIds(JSON.parse(storedCompletedQuestIds));
        }
    }, []);

    const onQuestClick = (quest: ProgressionPathQuest) => {
        switch (quest.type) {
            case 'minigame-quiz':
                navigate(`/minigames/play/quiz`, { 
                    state: { questId: quest.id, quizId: quest.quizId, allowClose: true }
                });
                break;
            case 'minigame-cut-guessr':
                navigate(`/minigames/play/cut-guessr`, {
                    state: { questId: quest.id, animal: quest.animal, allowClose: true }
                });
                break;
            case 'minigame-ingredient-match':
                navigate(`/minigames/play/ingredient-match`, {
                    state: { questId: quest.id, allowClose: true }
                });
                break;
            case 'minigame-virtual-sear':
                navigate(`/minigames/play/virtual-sear`, {
                    state: { questId: quest.id, allowClose: true }
                });
                break;
            case 'minigame-conversation-starter':
                navigate(`/minigames/play/conversation-starter`, {
                    state: { questId: quest.id, allowClose: true }
                });
                break;
            default:
                break;
        }
    }

    return (
        <Page>
            <Section>
                <h2>Welcome to Fix food</h2>
                <p>Click the button below to start your adventure!</p>
                <Button onClick={goToQuest}>Start Quest</Button>
            </Section>
            {
                !viewModel.isOnboardingComplete && <Section>
                    {
                        localStorage.getItem('onboardingData')
                            ? (
                                <>
                                    <h2>Finish your onboarding process!</h2>
                                    {/* <h3>some progress bar here</h3> */}
                                    <Button onClick={goToOnboading}>Continue</Button>
                                </>
                            )
                            : (
                                <>
                                    <h2>Start onboarding here</h2>
                                    <Button onClick={goToOnboading}>Start</Button>
                                </>
                            )
                    }
                </Section>
            }
            <div style={{ height: '20px' }} />
            {!viewModel.sessionDataStore.user && (
                <Section>
                    <Button onClick={() => {
                        loginViewModel.toggleLoginModal();
                        console.log("Modal state:", loginViewModel.isLoginModalOpen);
                    }}>
                        Login / Register
                    </Button>
                </Section>
            )}
            <LoginModal
                isOpen={loginViewModel.isLoginModalOpen}
                onClose={() => loginViewModel.toggleLoginModal()}
            />
            <Section>
                <h2>Progression Path</h2>
                <ProgressionPath units={mockProgressionPathData[0].units} onQuestClick={onQuestClick} completedQuestIds={completedQuestIds} />
            </Section>
        </Page>
    );
})

export default Home;
