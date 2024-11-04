import { ProgressionPath } from "@vuo/models/ProgressionPathTypes";

const mockProgressionPathData: ProgressionPath[] = [
    {
        id: "path1",
        title: "Basic of Cooking",
        description: "Learn the basics of cooking",
        color: "#000000",
        units: [
            {
                id: "unit1",
                title: "Introduction to Knife",
                levels: 3,
                description: "Learn the basics of cooking",
                color: "#000000",
                quests: [
                    {
                        id: "quest1-1",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        title: "Knife Basics",
                        quizId: "knife-skills-001",
                        description: "Get versed with knife skills",
                    },

                    {
                        id: "quest1-2",
                        type: "minigame-cut-guessr",
                        minigameId: "cut-guessr",
                        title: "How the Cow inside out",
                        animal: "Cow",
                        description: "Learn where cow cuts come from",
                    },
                    {
                        id: "quest1-3",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        quizId: "slice-evaluation-quiz-001",
                        title: "Slice Evaluation Quiz",
                        description: "Learn the basics of slicing",
                    }
                ]
            },
            {
                id: "unit2",
                title: "Mixing and You",
                levels: 3,
                description: "Learn the basics of mixing",
                color: "#000000",
                quests: [
                    {
                        id: "quest2-1",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        quizId: "whisk-evaluation-quiz-001",
                        title: "Whisk Evaluation Quiz",
                        description: "Learn the basics of whisking",
                    },
                    {
                        id: "quest2-2",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        quizId: "bag-mixing-001",
                        title: "Bag Mixing Quiz",
                        description: "Learn the basics of bag mixing",
                    },
                    {
                        id: "quest2-3",
                        type: "minigame-ingredient-match",
                        minigameId: "ingredient-match",
                        title: "Ingredient Match",
                        description: "Learn the basics of ingredient matching",
                    }
                ]
            }
        ]
    }
];

export default mockProgressionPathData;