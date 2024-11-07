import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "antd-mobile";
import mockRecipe from '@static/mockRecipe';
import mockQuizData from '@static/mockQuizData';
import games from '../organisms/GamePlayer';
import styles from './Minigames.module.scss';

function GamePlayerPage() {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const game = games.find(g => g.id === gameId);
    
    if (!game) {
        navigate('/minigames');
        return null;
    }

    const questId = searchParams.get('questId');
    const quizId = searchParams.get('quizId');
    const animal = searchParams.get('animal') as 'Cow' | 'Chicken' | 'Pig' | undefined;
    const allowReplayParam = searchParams.get('allowReplay');

    const quiz = quizId 
        ? mockQuizData.find(q => q.id === quizId) 
        : mockQuizData[Math.floor(Math.random() * mockQuizData.length)];

    const onClose = () => {
        if (questId) {
            const completedQuestIds = JSON.parse(localStorage.getItem('completedQuestIds') || '[]')
            localStorage.setItem('completedQuestIds', JSON.stringify([...completedQuestIds, questId]))
        }
        console.log(`${questId  } closed and completed`)
        navigate(-1);
    };

    const GameComponent = game.component;
    
    return (
        <div className={styles.minigames_container}>
            <Button onClick={() => navigate(-1)} className={styles.back_button}>
                Exit
            </Button>
            <GameComponent 
                allowReplay={allowReplayParam === 'true'}
                recipe={mockRecipe}
                quiz={quiz!}
                presetAnimal={animal}
                onClose={onClose} 
            />
        </div>
    );
}

export default GamePlayerPage; 