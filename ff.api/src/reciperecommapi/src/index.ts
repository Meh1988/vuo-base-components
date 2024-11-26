import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { cosineSimilarity } from "./utils"; // Adjust if path differs in the dist folder
import { MongoClient, Collection, Document } from "mongodb";

import { EmbeddingModel, FlagEmbedding } from "fastembed";
import * as fs from "fs";

dotenv.config();

// Initialize Express App
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI as string;
const client = new MongoClient(mongoUri);
const dbName = "fixfood-api-dev";

let recipesCollection: Collection<RecipeWithEmbedding> | null = null;
let usersCollection: Collection<UserWithEmbedding> | null = null;
let preferencesCollection: Collection<UserPreferences> | null = null;

const connectToMongo = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db(dbName);
        recipesCollection = db.collection<RecipeWithEmbedding>("Recipes_with_Embedding");
        usersCollection = db.collection<UserWithEmbedding>("Users_with_Embedding");
        preferencesCollection = db.collection<UserPreferences>("User_Preferences");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    }
};

// Ensure MongoDB is connected before starting the server
connectToMongo();

// Define interfaces for TypeScript type safety
interface UserPreferences {
    userId: string;
    preferences: {
        [key: string]: number;
    };
}

interface RecipeWithEmbedding {
    recipe_id: string | number;
    name: string;
    resources: { name: string; quantity: string | {}; unit: string }[];
    time: string[];
    preparation_time: string;
    score: number;
    embedding: number[];
    tags: string[];
}

interface UserWithEmbedding {
    userId: string;
    BMI: number;
    activityLevel: string;
    mindset: string;
    speed: string;
    dietPlan: string;
    pastExperience: string;
    format: string;
    allergies: string[];
    dislikes: string[];
    likes: string[];
    cuisines: string;
    pantry: string;
    cookingSkills: string;
    embedding: number[];
}

// Utility Functions
// Utility Functions
async function getEmbedding(text: string): Promise<number[]> {
    console.log("Generating embedding for text:", text);
    const embeddingModel = await FlagEmbedding.init({ model: EmbeddingModel.BGEBaseEN });
    const embeddings: number[][] = [];
    for await (const embedding of embeddingModel.embed([text])) {
        embeddings.push(embedding as unknown as number[]);
    }
    console.log("Generated embedding:", embeddings[0]);
    return embeddings[0];
}

function calculateBMI(weight: number, height: number): number {
    return weight / ((height / 100) ** 2);
}

function calculatePreference(user: UserWithEmbedding, recipe: RecipeWithEmbedding): number {
    // Check diet plan restrictions
    if (user.dietPlan?.toLowerCase() === "vegan" && !recipe.tags?.includes("vegan")) {
        return 0;
    }
    if (
        user.dietPlan?.toLowerCase() === "vegetarian" &&
        !recipe.tags?.includes("vegan") &&
        !recipe.tags?.includes("vegetarian")
    ) {
        return 0;
    }

    // Check allergies and dislikes
    const allVariants = (word: string) => [
        word.toLowerCase(),
        `${word.toLowerCase()}s`,
        `${word.toLowerCase()}es`,
        `${word.toLowerCase()}ed`,
    ];

    const userAllergies =
        user.allergies?.flatMap((allergy) => (allergy ? allVariants(allergy) : [])) || [];
    const userDislikes =
        user.dislikes?.flatMap((dislike) => (dislike ? allVariants(dislike) : [])) || [];
    const recipeResources =
        recipe.resources?.map((resource) => resource?.name?.toLowerCase() || "") || [];

    for (const allergy of userAllergies) {
        if (recipeResources.includes(allergy)) {
            return 0;
        }
    }

    for (const dislike of userDislikes) {
        if (recipeResources.includes(dislike)) {
            return 0;
        }
    }

    // Calculate similarity between embeddings
    const embeddingSimilarity = cosineSimilarity(user.embedding, recipe.embedding);

    // Calculate likes similarity
    const userLikes = user.likes?.map((like) => like?.toLowerCase() || "") || [];
    const likesSimilarity =
        recipe.resources?.filter((resource) => userLikes.includes(resource.name?.toLowerCase() || ""))
            .length / recipe.resources.length;

    // Calculate preference value
    const preferenceValue = (2 * embeddingSimilarity + 2 * likesSimilarity + recipe.score) / 5;

    return preferenceValue;
}

// Routes
// 1. Recommendation
app.get("/recommendations", async (req: Request, res: Response) => {
    const { userId, k } = req.query;

    if (!userId || !k) {
        return res.status(400).json({ error: "Missing userId or k" });
    }

    try {
        if (!preferencesCollection) {
            throw new Error("Preferences collection is not initialized");
        }

        const userDocument = await preferencesCollection.findOne({
            userId: userId.toString(),
        });

        if (!userDocument) {
            return res.status(404).json({ error: "User not found" });
        }

        const preferences = userDocument.preferences || {};
        const sortedPreferences = Object.entries(preferences)
            .sort(([_, a], [__, b]) => b - a)
            .slice(0, parseInt(k as string, 10));

        const topRecipes = await Promise.all(
            sortedPreferences.map(async ([recipeId, preference]) => {
                if (!recipesCollection) {
                    throw new Error("Recipes collection is not initialized");
                }
                const recipeDoc = await recipesCollection.findOne({
                    recipe_id: recipeId,
                });

                return {
                    recipe_id: recipeId,
                    preference,
                    name: recipeDoc ? recipeDoc.name : "Unknown",
                };
            })
        );

        res.json({ userId, top_k_recommendations: topRecipes });
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ error: "Error fetching recommendations" });
    }
});

//2. Update
app.post("/update_preference", async (req: Request, res: Response) => {
    const { userId, recipe_id, feedback } = req.body;

    // Validate request payload
    if (!userId || !recipe_id || feedback === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    if (feedback < 0 || feedback > 1) {
        return res.status(400).json({ error: "Feedback must be between 0 and 1" });
    }

    try {
        // Ensure MongoDB collections are initialized
        if (!usersCollection || !recipesCollection || !preferencesCollection) {
            throw new Error("MongoDB collections are not initialized");
        }

        // Fetch user and recipe documents in parallel
        const [userDocument, recipeDocument] = await Promise.all([
            usersCollection.findOne({ userId: userId.toString() }),
            recipesCollection.findOne({ recipe_id: recipe_id.toString() }),
        ]);

        if (!userDocument || !recipeDocument) {
            return res.status(404).json({ error: "User or Recipe not found" });
        }

        const userEmbedding = userDocument.embedding;
        const recipeEmbedding = recipeDocument.embedding;

        // Update the user's preference for the given recipe
        await preferencesCollection.updateOne(
            { userId: userId.toString() },
            { $set: { [`preferences.${recipe_id}`]: feedback } },
            { upsert: true }
        );

        // Calculate embedding magnitudes
        const userMagnitude = Math.sqrt(userEmbedding.reduce((sum, val) => sum + val ** 2, 0));
        const recipeMagnitude = Math.sqrt(recipeEmbedding.reduce((sum, val) => sum + val ** 2, 0));

        // Fetch all users and recipes for similarity calculations
        const [allUsers, allRecipes] = await Promise.all([
            usersCollection.find({}, { projection: { userId: 1, embedding: 1 } }).toArray(),
            recipesCollection.find({}, { projection: { recipe_id: 1, embedding: 1 } }).toArray(),
        ]);

        // Calculate similarities for users
        const userSimilarities = allUsers
            .filter(user => user.userId !== userId.toString())
            .map(user => ({
                userId: user.userId,
                similarity: cosineSimilarity(userEmbedding, user.embedding, userMagnitude),
            }))
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 10);

        // Calculate similarities for recipes
        const recipeSimilarities = allRecipes
            .filter(recipe => recipe.recipe_id !== recipe_id.toString())
            .map(recipe => ({
                recipe_id: recipe.recipe_id,
                similarity: cosineSimilarity(recipeEmbedding, recipe.embedding, recipeMagnitude),
            }))
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 10);

        // Prepare batch updates for similar users
        const userUpdates = userSimilarities.map(user => ({
            updateOne: {
                filter: { userId: user.userId },
                update: {
                    $set: {
                        [`preferences.${recipe_id}`]: Math.min(
                            Math.max(feedback * user.similarity, 0),
                            1
                        ),
                    },
                },
            },
        }));

        // Prepare batch updates for similar recipes
        const recipeUpdates = recipeSimilarities.map(recipe => ({
            updateOne: {
                filter: { userId: userId.toString() },
                update: {
                    $set: {
                        [`preferences.${recipe.recipe_id}`]: Math.min(
                            Math.max(feedback * recipe.similarity, 0),
                            1
                        ),
                    },
                },
            },
        }));

        // Perform batch updates in MongoDB
        if (userUpdates.length > 0 || recipeUpdates.length > 0) {
            await preferencesCollection.bulkWrite([...userUpdates, ...recipeUpdates]);
        }

        res.json({ message: "Preference updated successfully" });
    } catch (error) {
        console.error("Error updating preference:", error);

        if (error instanceof TypeError) {
            res.status(400).json({ error: "Invalid data format or missing fields" });
        } else {
            res.status(500).json({ error: "Error updating preference" });
        }
    }
});

// 3. Add User
interface UserProfile {
    userId: string; // Unique user identifier
    sex: string; // Gender of the user
    age: number; // Age in years
    height: number; // Height in centimeters
    currentWeight: number; // Current weight in kilograms
    goalWeight: number; // Target weight in kilograms
    motivation: string; // User's motivation for the diet
    activityLevel: string; // Physical activity level (e.g., sedentary, active)
    mindset: string; // Mindset for achieving goals
    speed: string; // Speed of desired progress (e.g., gradual, fast)
    dietPlan: string; // Type of diet (e.g., vegan, vegetarian, keto)
    pastExperience: string; // Past diet experience
    format: string; // Preferred guidance format (e.g., digital, print)
    allergies: string[]; // List of food allergies
    dislikes: string[]; // List of disliked ingredients
    likes: string[]; // List of favorite ingredients
    cuisines: string; // Preferred cuisines
    pantry: string; // Description of pantry items
    cookingSkills: string; // User's cooking skill level
}

// Interface for a user stored in the database with an embedding vector
interface UserWithEmbedding {
    userId: string; // Unique user identifier
    BMI: number; // Body Mass Index
    activityLevel: string; // Physical activity level
    mindset: string; // Mindset for achieving goals
    speed: string; // Speed of desired progress
    dietPlan: string; // Type of diet
    pastExperience: string; // Past diet experience
    format: string; // Preferred guidance format
    allergies: string[]; // List of food allergies
    dislikes: string[]; // List of disliked ingredients
    likes: string[]; // List of favorite ingredients
    cuisines: string; // Preferred cuisines
    pantry: string; // Description of pantry items
    cookingSkills: string; // User's cooking skill level
    embedding: number[]; // User's embedding vector
}

// Interface for a recipe stored in the database
interface RecipeWithEmbedding {
    recipe_id: string | number; // Consistent type for all references
    name: string;
    resources: { name: string; quantity: string | {}; unit: string }[];
    time: string[];
    preparation_time: string;
    score: number;
    embedding: number[];
    tags: string[];
}

// Interface for storing user preferences in the database
interface UserPreferences {
    userId: string; // Unique user identifier
    preferences: Record<string, number>; // Recipe IDs mapped to preference scores
}

// Safely access collections to avoid null issues
const getCollection = <T extends Document>(
    collection: Collection<T> | null,
    name: string
): Collection<T> => {
    if (!collection) {
        throw new Error(`${name} is not initialized. Ensure MongoDB connection is established.`);
    }
    return collection;
};

app.post("/add_user", async (req: Request, res: Response) => {
    const userProfile: UserProfile = req.body;

    try {
        console.log("Received user profile:", userProfile);

        // Validate request body
        if (!userProfile.userId || !userProfile.height || !userProfile.currentWeight) {
            return res.status(400).json({ error: "Missing required fields in user profile" });
        }

        // Safely access MongoDB collections
        const usersColl = getCollection(usersCollection, "Users_with_Embedding");
        const recipesColl = getCollection(recipesCollection, "Recipes_with_Embedding");
        const preferencesColl = getCollection(preferencesCollection, "User_Preferences");

        // Generate embedding for the user profile
        const { userId, sex, age, height, currentWeight, goalWeight, ...profileDetails } = userProfile;
        const profileText = JSON.stringify(profileDetails);
        const embedding = await getEmbedding(profileText);

        // Calculate BMI
        const BMI = calculateBMI(currentWeight, height);

        // Create user object with embedding
        const userWithEmbedding: UserWithEmbedding = {
            userId,
            BMI,
            activityLevel: userProfile.activityLevel,
            mindset: userProfile.mindset,
            speed: userProfile.speed,
            dietPlan: userProfile.dietPlan,
            pastExperience: userProfile.pastExperience,
            format: userProfile.format,
            allergies: userProfile.allergies,
            dislikes: userProfile.dislikes,
            likes: userProfile.likes,
            cuisines: userProfile.cuisines,
            pantry: userProfile.pantry,
            cookingSkills: userProfile.cookingSkills,
            embedding,
        };

        await usersColl.insertOne(userWithEmbedding);

        // Fetch all recipes
        const recipes: RecipeWithEmbedding[] = await recipesColl.find().toArray();
        if (recipes.length === 0) {
            return res.status(400).json({ error: "No recipes available for preference calculation" });
        }

        // Calculate preferences
        const userPreferences: { [recipeId: string]: number } = {};
        for (const recipe of recipes) {
            const preference = calculatePreference(userWithEmbedding, recipe);
            userPreferences[recipe.recipe_id.toString()] = preference;
        }

        // Normalize preferences
        if (Object.keys(userPreferences).length === 0) {
            return res.status(400).json({ error: "No preferences could be calculated for the user" });
        }

        const maxPref = Math.max(...Object.values(userPreferences));
        const minPref = Math.min(...Object.values(userPreferences));
        for (const recipeId in userPreferences) {
            userPreferences[recipeId] = maxPref !== minPref
                ? (userPreferences[recipeId] - minPref) / (maxPref - minPref)
                : 0;
        }

        await preferencesColl.insertOne({ userId, preferences: userPreferences });

        res.json({ message: "User profile uploaded and processed successfully" });
    } catch (error) {
        console.error("Error processing user profile:", error);
        res.status(500).json({ error: "Error processing user profile" });
    }
});


// 4. Add Recipe Profile
interface Recipe {
    recipe_id: string | number; // Ensuring consistency with RecipeWithEmbedding
    name: string;
    description: string;
    engagements: {
        rating: number;
        n_rater: number;
        n_reviewer: number;
    };
    time: string[];
    preparation_time: string;
    resources: { name: string; quantity: string | {}; unit: string }[];
    steps: { text: string }[];
    tags: string[];
}

app.post("/add_recipe", async (req: Request, res: Response) => {
    const recipe: Recipe = req.body;

    try {
        // Check if collections are initialized
        if (!recipesCollection || !usersCollection || !preferencesCollection) {
            throw new Error("MongoDB collections are not initialized");
        }

        console.log("Received recipe:", recipe);

        // Generate embedding for the recipe
        const recipeText = JSON.stringify({
            name: recipe.name,
            description: recipe.description,
            tags: recipe.tags,
            resources: recipe.resources.map(resource => resource.name),
        });
        console.log("Recipe text for embedding:", recipeText);

        const embedding = await getEmbedding(recipeText);
        console.log("Generated embedding:", embedding);

        // Create RecipeWithEmbedding object
        const recipeWithEmbedding: RecipeWithEmbedding = {
            recipe_id: recipe.recipe_id,
            name: recipe.name,
            resources: recipe.resources,
            time: recipe.time,
            preparation_time: recipe.preparation_time,
            score: recipe.engagements.rating,
            embedding,
            tags: recipe.tags,
        };

        console.log("Recipe with embedding:", recipeWithEmbedding);

        // Insert the new recipe into the Recipes_with_Embedding collection
        await recipesCollection.insertOne(recipeWithEmbedding);
        console.log("Inserted recipe with embedding into Recipes_with_Embedding collection");

        // Fetch all users
        const users = await usersCollection.find().toArray();
        console.log("Fetched users from Users_with_Embedding collection");

        // Update preferences for all users for the new recipe
        const userPreferencesUpdates = users.map(user => {
            const preference = calculatePreference(user, recipeWithEmbedding);
            return {
                updateOne: {
                    filter: { userId: user.userId },
                    update: { $set: { [`preferences.${recipe.recipe_id}`]: preference } },
                },
            };
        });

        // Perform batch updates in MongoDB
        if (userPreferencesUpdates.length > 0) {
            await preferencesCollection.bulkWrite(userPreferencesUpdates);
            console.log("Updated user preferences in User_Preferences collection");
        }

        res.json({ message: "Recipe added and preferences updated successfully" });
    } catch (error) {
        console.error("Error adding recipe:", error);

        if (error instanceof TypeError) {
            res.status(400).json({ error: "Invalid data format or missing fields" });
        } else {
            res.status(500).json({ error: "Error adding recipe" });
        }
    }
});



// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
