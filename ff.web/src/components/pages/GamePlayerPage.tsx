import { useParams, useNavigate } from "react-router-dom";
import { Button } from "antd-mobile";
import mockRecipe from '@static/mockRecipe';
import mockQuizData from '@static/mockQuizData';
import games from '../organisms/GamePlayer';
import styles from './Minigames.module.scss';

function GamePlayerPage() {
    const { gameId } = useParams();
    const navigate = useNavigate();
    
    const game = games.find(g => g.id === gameId);
    
    if (!game) {
        navigate('/minigames');
        return null;
    }

    const quiz = mockQuizData[Math.floor(Math.random() * mockQuizData.length)];

    const onClose = () => {
        navigate('/minigames');
    };

    const GameComponent = game.component;
    
    return (
        <div className={styles.minigames_container}>
            <Button onClick={onClose} className={styles.back_button}>
                Back to Games
            </Button>
            <GameComponent 
                allowPlayAgain={gameId === 'virtual-sear' || gameId === 'cut-guessr'}
                allowReplay={gameId === 'conversation-starter' || gameId === 'ingredient-match'}
                recipe={mockRecipe}
                quiz={quiz}
                onClose={onClose} 
            />
        </div>
    );
}

export default GamePlayerPage; 