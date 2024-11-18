import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd-mobile";
import mockRecipe from '@static/mockRecipe';
import mockQuizData from '@static/mockQuizData';
import games from '../organisms/GamePlayer';
import styles from './Minigames.module.scss';
import { analytics } from '../../config/firebase';
import { logEvent } from 'firebase/analytics';
import { useState } from 'react';

interface GamePageState {
    questId?: string;
    quizId?: string;
    animal?: 'Cow' | 'Chicken' | 'Pig';
    allowReplay?: boolean;
    allowClose?: boolean;
}

function GamePlayerPage() {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as GamePageState;
    const { questId, quizId, animal, allowReplay, allowClose } = state || {};
    
    const game = games.find(g => g.id === gameId);
    
    if (!game) {
        navigate('/minigames');
        return null;
    }

    const [startTime] = useState(Date.now());

    const handleGameComplete = (gameResult: any) => {
        const duration = Date.now() - startTime;
        logEvent(analytics, 'minigame_completed', {
            game_id: gameId,
            game_name: game.name,
            quest_id: questId,
            score: gameResult?.score,
            duration: duration,
            success: gameResult?.wasSuccessful
        });
    };

    const onClose = () => {
        if (questId) {
            handleGameComplete({ wasSuccessful: true }); // Log the game completion
            const completedQuestIds = JSON.parse(localStorage.getItem('completedQuestIds') || '[]')
            localStorage.setItem('completedQuestIds', JSON.stringify([...completedQuestIds, questId]))
        }
        navigate(-1);
    };

    const quiz = quizId 
        ? mockQuizData.find(q => q.id === quizId) 
        : mockQuizData[Math.floor(Math.random() * mockQuizData.length)];

    const GameComponent = game.component;

    return (
        <div className={styles.minigames_container}>
            <Button onClick={() => navigate(-1)} className={styles.back_button}>
                Exit
            </Button>
            <GameComponent 
                allowClose={allowClose === true}
                allowReplay={allowReplay === true}
                recipe={mockRecipe}
                quiz={quiz!}
                presetAnimal={animal as 'Cow' | 'Chicken' | 'Pig'}
                onClose={onClose}
            />
        </div>
    );
}

export default GamePlayerPage; 