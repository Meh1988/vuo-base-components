export interface ProgressionPath {
    id: string;
    title: string;
    description: string;
    color: string;
    units: Unit[];
}

export interface Unit {
    id: string;
    title: string;
    description: string;
    color: string;
    levels: number;
    quests: ProgressionPathQuest[];
}

export type ProgressionPathQuestType = 
    | 'recipe' 
    | 'minigame'
    | 'minigame-virtual-sear'
    | 'minigame-cut-guessr'
    | 'minigame-conversation-starter'
    | 'minigame-ingredient-match'
    | 'minigame-quiz';

export interface ProgressionPathQuest {
    id: string;
    minigameId?: string;
    animal?: string;
    quizId?: string;
    recipeId?: string;
    title: string;
    description: string;
    type: ProgressionPathQuestType;
}
