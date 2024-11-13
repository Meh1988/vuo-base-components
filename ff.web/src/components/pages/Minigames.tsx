import { Grid, Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import games  from '../organisms/GamePlayer';
import styles from './Minigames.module.scss';

function Minigames() {
    const navigate = useNavigate();

    const mockUserData = {
        unlockedMinigames: [
            "virtual-sear",
            "cut-guessr",
            "conversation-starter",
            "ingredient-match",
            "quiz"
        ]
    };

    const onSelectGame = (selectedGameId: string) => {
        const game = games.find((g: { id: string }) => g.id === selectedGameId);
        if (game) {
            navigate(`/minigames/play/${game.id}`);
        }
    }

    return (
        <div className={styles.minigames_container}>
            <Grid columns={2} gap={16}>
                {games
                    .filter((game: { id: string }) => mockUserData.unlockedMinigames.includes(game.id))
                    .map((game: { id: string, name: string }) => (
                        <Grid.Item key={game.id}>
                            <Button
                                block
                                onClick={() => onSelectGame(game.id)}
                                className={styles.game_button}
                            >
                                {game.name}
                            </Button>
                        </Grid.Item>
                    ))
                }
            </Grid>
        </div>
    );
}

export default Minigames;
