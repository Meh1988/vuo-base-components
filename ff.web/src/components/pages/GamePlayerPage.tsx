import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd-mobile";
import mockRecipe from '@static/mockRecipe';
import mockQuizData from '@static/mockQuizData';
import games from '../organisms/GamePlayer';
import styles from './Minigames.module.scss';

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

    const quiz = quizId 
        ? mockQuizData.find(q => q.id === quizId) 
        : mockQuizData[Math.floor(Math.random() * mockQuizData.length)];

    const onClose = () => {
        if (questId) {
            const completedQuestIds = JSON.parse(localStorage.getItem('completedQuestIds') || '[]')
            localStorage.setItem('completedQuestIds', JSON.stringify([...completedQuestIds, questId]))
        }
        navigate(-1);
    };

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