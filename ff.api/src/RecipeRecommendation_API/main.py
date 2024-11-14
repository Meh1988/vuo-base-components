from fastapi import FastAPI, HTTPException
from pymongo import MongoClient, UpdateOne, IndexModel, ASCENDING

from typing import List
from concurrent.futures import ThreadPoolExecutor

from pydantic import BaseModel

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize the FastAPI app
app = FastAPI()

# MongoDB connection
# Get MongoDB URI from environment variables
mongo_uri = os.getenv("MONGODB_URI")

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client["fixfood-api-dev"]

# Collections
recipes_collection = db["Recipes_with_Embedding"]
users_collection = db["Users_with_Embedding"]
preferences_collection = db["User_Preferences"]


# Initialize FastAPI app
app = FastAPI()


# Ensure indexes are created
preferences_collection.create_indexes([IndexModel([("user_id", ASCENDING)])])
users_collection.create_indexes([IndexModel([("user_id", ASCENDING)])])
recipes_collection.create_indexes([IndexModel([("recipe_id", ASCENDING)])])

# Function to get top k recipes with names for a user
def get_top_k_recipes(user_id: int, k: int):
    user_id_str = str(user_id)
    user_document = preferences_collection.find_one({"user_id": user_id_str})
    
    if user_document:
        preferences = user_document.get("preferences", {})
        top_k_recipes = sorted(preferences.items(), key=lambda item: item[1], reverse=True)[:k]
        
        top_k_recipes_output = []
        for recipe_id, preference in top_k_recipes:
            recipe_document = recipes_collection.find_one({"recipe_id": str(recipe_id)})
            if recipe_document:
                recipe_name = recipe_document.get("name", "Unknown")
                top_k_recipes_output.append({
                    "recipe_id": int(recipe_id),
                    "preference": preference,
                    "name": recipe_name
                })
            else:
                top_k_recipes_output.append({
                    "recipe_id": int(recipe_id),
                    "preference": preference,
                    "name": "Not found"
                })
        
        return top_k_recipes_output
    else:
        raise HTTPException(status_code=404, detail="User not found")

# Define the API endpoint to get recommendations
@app.get("/recommendations/")
def recommend_recipes(user_id: int, k: int):
    try:
        top_k_recipes = get_top_k_recipes(user_id, k)
        return {"user_id": user_id, "top_k_recommendations": top_k_recipes}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while fetching recommendations")
    
#--------------------------------------------------------------
#--------------------------------------------------------------

# Pydantic model for feedback input
class FeedbackInput(BaseModel):
    user_id: int
    recipe_id: int
    feedback: float

# Calculate cosine similarity using numpy for batch processing
def batch_cosine_similarity(target_embedding, embeddings):
    target_vector = np.array(target_embedding).reshape(1, -1)
    embedding_matrix = np.array(embeddings)
    similarities = cosine_similarity(target_vector, embedding_matrix)[0]
    return similarities

# Function to update user preference and propagate to similar users and recipes
def update_user_preference_with_propagation(user_id: int, recipe_id: int, feedback: float):
    user_id_str = str(user_id)
    recipe_id_str = str(recipe_id)

    # Validate feedback within the range [0, 1]
    if not (0 <= feedback <= 1):
        raise HTTPException(status_code=400, detail="Feedback must be between 0 and 1.")

    # Update the user's preference directly
    preferences_collection.update_one(
        {"user_id": user_id_str},
        {"$set": {f"preferences.{recipe_id_str}": feedback}},
        upsert=True
    )

    # Retrieve user and recipe embeddings for similarity calculation
    user_document = users_collection.find_one({"user_id": user_id_str})
    recipe_document = recipes_collection.find_one({"recipe_id": recipe_id_str})

    if not user_document or not recipe_document:
        raise HTTPException(status_code=404, detail="User or Recipe not found.")

    user_embedding = user_document["embedding"]
    recipe_embedding = recipe_document["embedding"]

    # Retrieve all user and recipe embeddings and IDs
    all_user_docs = list(users_collection.find({}, {"user_id": 1, "embedding": 1}))
    all_recipe_docs = list(recipes_collection.find({}, {"recipe_id": 1, "embedding": 1}))

    all_user_ids = [str(doc["user_id"]) for doc in all_user_docs if doc["user_id"] != user_id_str]
    all_user_embeddings = [doc["embedding"] for doc in all_user_docs if doc["user_id"] != user_id_str]
    all_recipe_ids = [str(doc["recipe_id"]) for doc in all_recipe_docs if doc["recipe_id"] != recipe_id_str]
    all_recipe_embeddings = [doc["embedding"] for doc in all_recipe_docs if doc["recipe_id"] != recipe_id_str]

    # Calculate similarities in batch
    user_similarities = batch_cosine_similarity(user_embedding, all_user_embeddings)
    recipe_similarities = batch_cosine_similarity(recipe_embedding, all_recipe_embeddings)

    # Pair IDs with similarities and sort to get top 10 similar users and recipes
    top_similar_users = sorted(
        zip(all_user_ids, user_similarities), key=lambda x: x[1], reverse=True
    )[:10]
    top_similar_recipes = sorted(
        zip(all_recipe_ids, recipe_similarities), key=lambda x: x[1], reverse=True
    )[:10]

    # Prepare bulk updates for similar users' preferences
    user_updates = [
        UpdateOne(
            {"user_id": similar_user_id},
            {"$set": {f"preferences.{recipe_id_str}": min(max(feedback * similarity_score, 0), 1)}}
        )
        for similar_user_id, similarity_score in top_similar_users
    ]

    # Prepare bulk updates for similar recipes' preferences
    recipe_updates = [
        UpdateOne(
            {"user_id": user_id_str},
            {"$set": {f"preferences.{similar_recipe_id}": min(max(feedback * similarity_score, 0), 1)}}
        )
        for similar_recipe_id, similarity_score in top_similar_recipes
    ]

    # Execute bulk write operations
    if user_updates:
        preferences_collection.bulk_write(user_updates)
    if recipe_updates:
        preferences_collection.bulk_write(recipe_updates)

    return {"message": "User preference and similar items updated successfully"}

# Define the API endpoint to update preferences
@app.post("/update_preference/")
def update_preference(feedback_input: FeedbackInput):
    try:
        result = update_user_preference_with_propagation(
            feedback_input.user_id, 
            feedback_input.recipe_id, 
            feedback_input.feedback
        )
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while updating preference with propagation")