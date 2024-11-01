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

enum ProgressionPathQuestType {
    CHALLENGE = 'challenge',
    QUEST = 'quest',
}

export interface ProgressionPathQuest {
    id: string;
    title: string;
    description: string;
    color: string;
    type: ProgressionPathQuestType;
}
