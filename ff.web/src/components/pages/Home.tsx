// @ts-nocheck

import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Button from "../atoms/Button";
import Page from "../templates/Page";
import useStackNavigator from "@vuo/hooks/StackNavigator";
import { useAppContext } from "@vuo/context/AppContext";
import QuestBrowseViewModel from "@vuo/viewModels/QuestBrowseViewModel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mockProgressionPathData from "@static/mockProgressionPathData";
import { ProgressionPathQuest } from "@vuo/models/ProgressionPathTypes";
import Button from "../atoms/Button";
import Page from "../templates/Page";
import Section from "../atoms/Section";
import ProgressionPath from "../organisms/ProgressionPath";
import LoginViewModel from "../../viewModels/LoginViewModel";
import LoginModal from "../organisms/LoginModal";

    
    
const Home = observer(() => {
    const navigate = useNavigate();
    const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([])     
    const { navigateWithState } = useStackNavigator();
    const [viewModel] = useState<QuestBrowseViewModel>(() => new QuestBrowseViewModel());
    const [loginViewModel] = useState<LoginViewModel>(() => new LoginViewModel());

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
        console.log(quest)
        switch (quest.type) {
            case 'minigame-quiz':
                navigate(`/minigames/play/quiz?quizId=${quest.quizId}&questId=${quest.id}`)
                break;
            case 'minigame-cut-guessr':
                navigate(`/minigames/play/cut-guessr?animal=${quest.animal}&questId=${quest.id}`)
                break;
            case 'minigame-ingredient-match':
                navigate(`/minigames/play/ingredient-match?questId=${quest.id}`)
                break;
            case 'minigame-virtual-sear':
                navigate(`/minigames/play/virtual-sear?questId=${quest.id}`)
                break;
            case 'minigame-conversation-starter':
                navigate(`/minigames/play/conversation-starter?questId=${quest.id}`)
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
                !isOnboardingComplete && <Section>
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
                                <div>
                                    <h2>Start onboarding here</h2>
                                    <Button onClick={goToOnboading}>Start</Button>
                                </div>
                            )
                    }
                </Section>
            }
            <div style={{ height: '20px' }} />
            <Section>
                <h2>Progression Path</h2>
                <ProgressionPath units={mockProgressionPathData[0].units} onQuestClick={onQuestClick} completedQuestIds={completedQuestIds} />
            </Section>

            <LoginModal
                isOpen={loginViewModel.isLoginModalOpen}
                onClose={() => loginViewModel.toggleLoginModal()}
            />
        </Page>
    );
})

export default Home;
