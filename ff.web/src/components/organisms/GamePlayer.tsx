import VirtualSear from '@vuo/components/organisms/VirtualSear';
import CutGuessr from "./CutGuessr";
import ConversationStarter from "./ConversationStarter";
import IngredientMatch from "./IngredientMatch";
import QuizOrganism from "./QuizOrganism";

const games = [
    { 
        id: "virtual-sear", 
        name: "Virtual Sear", 
        component: VirtualSear
    },
    { 
        id: "cut-guessr", 
        name: "Cut Guessr", 
        component: CutGuessr
    },
    { 
        id: "conversation-starter", 
        name: "Conversation Starter", 
        component: ConversationStarter
    },
    { 
        id: "ingredient-match", 
        name: "Ingredient Match", 
        component: IngredientMatch
    },
    { 
        id: "quiz", 
        name: "Quiz", 
        component: QuizOrganism
    }
]; 

export default games;