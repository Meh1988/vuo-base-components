import {  useState } from "react";
import { observer } from "mobx-react-lite";
import { Grid, Button } from "antd-mobile";
import VirtualSear from '@vuo/components/organisms/VirtualSear';
import mockQuizData from '@static/mockQuizData';
import mockRecipe from '@static/mockRecipe';
import styles from './Minigames.module.scss'
import CutGuessr from "../organisms/CutGuessr";
import ConversationStarter from "../organisms/ConversationStarter";
import IngredientMatch from "../organisms/IngredientMatch";
import QuizOrganism from "../organisms/QuizOrganism";


const Minigames = observer(() => {
    const [selectedGame, setSelectedGame] = useState<string | null>(null);

    const mockUserData = {
        unlockedMinigames: [
            "virtual-sear",
            "cut-guessr",
            "conversation-starter",
            "ingredient-match",
            "quiz"
        ]
    }

    const quiz = mockQuizData[Math.floor(Math.random() * mockQuizData.length)];

    const games = [
        { id: "virtual-sear", name: "Virtual Sear", component: <VirtualSear allowPlayAgain /> },
        { id: "cut-guessr", name: "Cut Guessr", component: <CutGuessr allowPlayAgain /> },
        { id: "conversation-starter", name: "Conversation Starter", component: <ConversationStarter allowReplay /> },
        { id: "ingredient-match", name: "Ingredient Match", component: <IngredientMatch allowReplay recipe={mockRecipe} /> },
        { id: "quiz", name: "Quiz", component: <QuizOrganism quiz={quiz} /> }
    ];

    const startBrowserBack = () => {
        window.onpopstate = null;
        window.history.back();
      };

    const stopBrowserBack = (callback: () => void) => {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => {
          window.history.pushState(null, "", window.location.href);
          callback();
        };
      };

    const onSelectGame = (selectedGameName: string) => {
        setSelectedGame(selectedGameName)
        stopBrowserBack(()=>setSelectedGame(null))
    }

    const renderGameButtons = (unlockedGames: string[]) => (
        <Grid columns={2} gap={16}>
            {games.filter(game => unlockedGames.includes(game.id)).map((game) => (
                <Grid.Item key={game.name}>
                    <Button
                        block
                        onClick={() => onSelectGame(game.name)}
                        className={styles.game_button}
                    >
                        {game.name}
                    </Button>
                </Grid.Item>
            ))}
        </Grid>
    );

    const onClose = () => {
        setSelectedGame(null);
        startBrowserBack()
    }

    const renderSelectedGame = () => {
        const game = games.find(g => g.name === selectedGame);
        return game ? (
            <>
                <Button onClick={onClose} className={styles.back_button}>
                    Back to Games
                </Button>
                {game.component}
            </>
        ) : null;
    };

    return (
        <div className={styles.minigames_container}>
            {selectedGame ? renderSelectedGame() : renderGameButtons(mockUserData.unlockedMinigames)}
        </div>
    );
});

export default Minigames;
