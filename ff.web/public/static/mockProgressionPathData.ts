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
                color: "var(--surface-brand-orange)",
                quests: [
                    {
                        id: "quest1-1-basicooking",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        title: "Knife Basics",
                        quizId: "67334bb63711d8e7d6350dff",
                        description: "Get versed with knife skills",
                    },

                    {
                        id: "quest1-2-basicooking",
                        type: "minigame-cut-guessr",
                        minigameId: "cut-guessr",
                        title: "How the Cow inside out",
                        animal: "Cow",
                        description: "Learn where cow cuts come from",
                    },
                    {
                        id: "quest1-3-basicooking",
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
                color: "var(--surface-brand-blue)",
                quests: [
                    {
                        id: "quest2-1-basicooking",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        quizId: "whisk-evaluation-quiz-001",
                        title: "Whisk Evaluation Quiz",
                        description: "Learn the basics of whisking",
                    },
                    {
                        id: "quest2-2-basicooking",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        quizId: "bag-mixing-001",
                        title: "Bag Mixing Quiz",
                        description: "Learn the basics of bag mixing",
                    },
                    {
                        id: "quest2-3-basicooking",
                        type: "minigame-ingredient-match",
                        minigameId: "ingredient-match",
                        title: "Ingredient Match",
                        description: "Learn the basics of ingredient matching",
                    }
                ]
            },
            {
                id: "unit3",
                title: "Baking Fundamentals",
                levels: 4,
                description: "Master the basics of baking",
                color: "var(--surface-brand-purple)",
                quests: [
                    {
                        id: "quest3-1-basicooking",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        title: "Baking Basics Quiz",
                        quizId: "baking-basics-001",
                        description: "Learn the fundamentals of baking",
                    },
                    {
                        id: "quest3-2-basicooking",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        title: "Temperature Control",
                        quizId: "oven-calibration-001",
                        description: "Master oven temperature control",
                    },
                    {
                        id: "quest3-3-basicooking",
                        type: "minigame-ingredient-match",
                        minigameId: "ingredient-match",
                        title: "Interactive Baking Challenge",
                        description: "Test your baking knowledge interactively",
                    },
                    {
                        id: "quest3-4-basicooking",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        title: "Baking Tools",
                        quizId: "tool-switch-001",
                        description: "Learn about essential baking tools",
                    }
                ]
            },
            {
                id: "unit4",
                title: "Beverage Mastery",
                levels: 4,
                description: "Explore the art of beverage making",
                color: "var(--surface-brand-red)",
                quests: [
                    {
                        id: "quest4-1-basicooking",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        title: "Beverage Basics",
                        quizId: "beverage-basics-001",
                        description: "Learn the basics of beverage making",
                    },
                    {
                        id: "quest4-2-basicooking",
                        type: "minigame-conversation-starter",
                        minigameId: "conversation-starter",
                        title: "Interactive Drink Challenge",
                        description: "Test your drink-making knowledge",
                    },
                    {
                        id: "quest4-3-basicooking",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        title: "Sauce Decoration",
                        quizId: "make-sauce-decoration-001",
                        description: "Learn about decorative elements",
                    },
                    {
                        id: "quest4-4-basicooking",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        title: "Herbs to Flavors",
                        quizId: "herbs-and-spices-001",
                        description: "Master herbs and spices",
                    }
                ]
            },
            {
                id: "unit5",
                title: "International Cuisine",
                levels: 5,
                description: "Explore cuisines from around the world",
                color: "var(--surface-brand-green)",
                quests: [
                    {
                        id: "quest5-1-basicooking",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        title: "Global Flavors",
                        quizId: "international-cuisines-001",
                        description: "Learn about international dishes",
                    },
                    {
                        id: "quest5-2-basicooking",
                        type: "minigame-virtual-sear",
                        minigameId: "virtual-sear",
                        title: "Searing Mastery",
                        description: "Master global seasonings",
                    },
                    {
                        id: "quest5-3-basicooking",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        title: "Interactive Cuisine Challenge",
                        quizId: "international-cuisines-001",
                        description: "Test your international cuisine knowledge",
                    },
                    {
                        id: "quest5-4-basicooking",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        title: "Food Origins",
                        quizId: "food-quiz-001",
                        description: "Learn about food origins",
                    },
                    {
                        id: "quest5-5-basicooking",
                        type: "minigame-quiz",
                        minigameId: "quiz",
                        title: "Global Flavors 2",
                        quizId: "international-cuisines-002",
                        description: "Master various cooking techniques",
                    }
                ]
            }
        ]
    },
    {
        "title": "Mastering Spaghetti Making",
        "description": "A comprehensive guide to mastering the art of spaghetti making, from selecting ingredients to perfecting sauces and cooking techniques.",
        "units": [
            {
                "id": "unit1",
                "title": "Understanding Ingredients",
                "levels": 3,
                "description": "Learn about the essential ingredients for making spaghetti.",
                "quests": [
                    {
                        "type": "minigame-quiz",
                        "minigameId": "quiz",
                        "title": "Pasta Varieties Quiz",
                        "description": "Identify different types of pasta and their uses."
                    },
                    {
                        "type": "minigame-ingredient-match",
                        "minigameId": "ingredient-match",
                        "title": "Sauce and Pasta Pairing",
                        "description": "Match sauces with the appropriate pasta types."
                    },
                    {
                        "type": "minigame-quiz",
                        "minigameId": "quiz",
                        "title": "Herbs and Spices Quiz",
                        "description": "Learn about herbs and spices used in spaghetti dishes."
                    }
                ]
            },
            {
                "id": "unit2",
                "title": "Perfecting the Sauce",
                "levels": 4,
                "description": "Master the art of making delicious spaghetti sauces.",
                "quests": [
                    {
                        "type": "minigame-quiz",
                        "minigameId": "quiz",
                        "title": "Tomato Sauce Basics",
                        "description": "Learn the fundamentals of making tomato sauce."
                    },
                    {
                        "type": "minigame-ingredient-match",
                        "minigameId": "ingredient-match",
                        "title": "Ingredient Selection",
                        "description": "Choose the best ingredients for your sauce."
                    },
                    {
                        "type": "minigame-conversation-starter",
                        "minigameId": "conversation-starter",
                        "title": "Sauce Flavor Balancing",
                        "description": "Discuss how to balance flavors in your sauce."
                    },
                    {
                        "type": "minigame-quiz",
                        "minigameId": "quiz",
                        "title": "Creamy Sauces Quiz",
                        "description": "Explore the techniques for making creamy sauces."
                    }
                ]
            },
            {
                "id": "unit3",
                "title": "Cooking Techniques",
                "levels": 3,
                "description": "Learn the techniques for cooking perfect spaghetti.",
                "quests": [
                    {
                        "type": "minigame-quiz",
                        "minigameId": "quiz",
                        "title": "Boiling Pasta Quiz",
                        "description": "Understand the process of boiling pasta to perfection."
                    },
                    {
                        "type": "minigame-virtual-sear",
                        "minigameId": "virtual-sear",
                        "title": "Searing Ingredients",
                        "description": "Learn how to sear ingredients for added flavor."
                    },
                    {
                        "type": "minigame-quiz",
                        "minigameId": "quiz",
                        "title": "Timing and Texture",
                        "description": "Master the timing and texture of cooked pasta."
                    }
                ]
            },
            {
                "id": "unit4",
                "title": "Presentation and Serving",
                "levels": 3,
                "description": "Enhance your spaghetti presentation and serving skills.",
                "quests": [
                    {
                        "type": "minigame-quiz",
                        "minigameId": "quiz",
                        "title": "Plating Techniques Quiz",
                        "description": "Learn techniques for plating spaghetti beautifully."
                    },
                    {
                        "type": "minigame-conversation-starter",
                        "minigameId": "conversation-starter",
                        "title": "Garnishing Ideas",
                        "description": "Discuss creative garnishing ideas for spaghetti."
                    },
                    {
                        "type": "minigame-quiz",
                        "minigameId": "quiz",
                        "title": "Serving Suggestions",
                        "description": "Explore different ways to serve spaghetti dishes."
                    }
                ]
            }
        ]
    }
];

export default mockProgressionPathData;