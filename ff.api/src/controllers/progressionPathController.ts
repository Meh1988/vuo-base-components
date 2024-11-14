import { NextFunction, Request, Response } from "express";
import { ProgressionPathModel } from "../models/progressionPathModel";
import { sendOpenAIRequest } from "../externalAPI/openAI";
import { generateChallengeFunction } from "./challengesController";
import OpenAI from "openai";
import mongoose from "mongoose";

export const getAllProgressionPaths = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const progressionPaths = await ProgressionPathModel.find();
    res.json(progressionPaths);
  } catch (error) {
    next(error);
  }
};

export const createProgressionPath = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, units } = req.body;
  if (!title || !description || !units) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const progressionPath = new ProgressionPathModel({
      title,
      description,
      units,
    });
    await progressionPath.save();
    res.status(201).json(progressionPath);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

export const generateProgressionPath = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const messages = [
    {
      role: "system",
      content: [
        {
          type: "text",
          text: "You are a helpful assistant that generates progression path objects based on the user's prompt and the schema provided.",
        },
      ],
    },
    {
      role: "assistant",
      content: [
        {
          type: "text",
          text: `{
          title: "Basic of Cooking",
          description: "Learn the basics of cooking",
          units: [
              {
                  id: "unit1",
                  title: "Introduction to Knife",
                  levels: 3,
                  description: "Learn the basics of cooking",
                  quests: [
                      {
                          type: "minigame-quiz",
                          minigameId: "quiz",
                          title: "Knife Basics",
                          description: "Get versed with knife skills",
                      },
  
                      {
                          type: "minigame-cut-guessr",
                          minigameId: "cut-guessr",
                          title: "How the Cow inside out",
                          description: "Learn where cow cuts come from",
                      },
                      {
                          type: "minigame-quiz",
                          minigameId: "quiz",
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
                  quests: [
                      {
                          type: "minigame-quiz",
                          minigameId: "quiz",
                          title: "Whisk Evaluation Quiz",
                          description: "Learn the basics of whisking",
                      },
                      {
                          type: "minigame-quiz",
                          minigameId: "quiz",
                          title: "Bag Mixing Quiz",
                          description: "Learn the basics of bag mixing",
                      },
                      {
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
                  quests: [
                      {
                          type: "minigame-quiz",
                          minigameId: "quiz",
                          title: "Baking Basics Quiz",
                          description: "Learn the fundamentals of baking",
                      },
                      {
                          type: "minigame-quiz",
                          minigameId: "quiz",
                          title: "Temperature Control",
                          description: "Master oven temperature control",
                      },
                      {
                          type: "minigame-ingredient-match",
                          minigameId: "ingredient-match",
                          title: "Interactive Baking Challenge",
                          description: "Test your baking knowledge interactively",
                      },
                      {
                          type: "minigame-quiz",
                          minigameId: "quiz",
                          title: "Baking Tools",
                          description: "Learn about essential baking tools",
                      }
                  ]
              },
              {
                  id: "unit4",
                  title: "Beverage Mastery",
                  levels: 4,
                  description: "Explore the art of beverage making",
                  quests: [
                      {
                          type: "minigame-quiz",
                          minigameId: "quiz",
                          title: "Beverage Basics",
                          description: "Learn the basics of beverage making",
                      },
                      {
                          type: "minigame-conversation-starter",
                          minigameId: "conversation-starter",
                          title: "Interactive Drink Challenge",
                          description: "Test your drink-making knowledge",
                      },
                      {
                          type: "minigame-quiz",
                          minigameId: "quiz",
                          title: "Sauce Decoration",
                          description: "Learn about decorative elements",
                      },
                      {
                          type: "minigame-quiz",
                          minigameId: "quiz",
                          title: "Herbs to Flavors",
                          description: "Master herbs and spices",
                      }
                  ]
              },
              {
                  id: "unit5",
                  title: "International Cuisine",
                  levels: 5,
                  description: "Explore cuisines from around the world",
                  quests: [
                      {
                          type: "minigame-quiz",
                          minigameId: "quiz",
                          title: "Global Flavors",
                          description: "Learn about international dishes",
                      },
                      {
                          type: "minigame-virtual-sear",
                          minigameId: "virtual-sear",
                          title: "Searing Mastery",
                          description: "Master global seasonings",
                      },
                      {
                          type: "minigame-quiz",
                          minigameId: "quiz",
                          title: "Interactive Cuisine Challenge",
                          description: "Test your international cuisine knowledge",
                      },
                      {
                          type: "minigame-quiz",
                          minigameId: "quiz",
                          title: "Food Origins",
                          description: "Learn about food origins",
                      },
                      {
                          type: "minigame-quiz",
                          minigameId: "quiz",
                          title: "Global Flavors 2",
                          description: "Master various cooking techniques",
                      }
                  ]
              }
          ]
      }`,
        },
      ],
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: `Extract the objective from the following prompt and generate a progression path to master this objective: ${prompt}.
          The progression path should be in the following format:
          {
            title: string,
            description: string,
            units: [{
              id: string,
              title: string,
              levels: number,
              description: string,
              quests: [{
                type: string,
                minigameId: string,
                title: string,
                description: string,
              }]
            }]
          }
          The number of units should be between 3 and 5.
          The id of each unit should in the format of "unit1", "unit2", "unit3", etc.
          The levels is the number of quests in the unit.
          The number of quests in each unit should be between 3 and 5. 
          The type of each quest must be one of the following: "minigame-quiz", "minigame-cut-guessr", "minigame-conversation-starter", "minigame-ingredient-match", "minigame-virtual-sear".
          The minigameId must be "quiz", "cut-guessr", "conversation-starter", "ingredient-match", "virtual-sear". This must match the above quest type.
          Select the type of quest and minigameId based on the objective of the unit.
          The title of each quest should be a short, descriptive title for the quest.
          The description of each quest should be a short, descriptive description for the quest.
          `,
        },
      ],
    },
  ] as OpenAI.ChatCompletionMessageParam[];
  const response_format = {
    type: "json_schema",
    json_schema: {
      name: "progression_path",
      schema: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          units: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                title: { type: "string" },
                levels: { type: "number" },
                description: { type: "string" },
                quests: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: { type: "string" },
                      minigameId: { type: "string" },
                      title: { type: "string" },
                      description: { type: "string" },
                    },
                    required: ["type", "minigameId", "title", "description"],
                  },
                },
              },
              required: ["id", "title", "levels", "description", "quests"],
            },
          },
        },
        required: ["title", "description", "units"],
      },
    },
  };
  try {
    const response = await sendOpenAIRequest(messages, response_format);
    const progressionPath = new ProgressionPathModel(response);
    console.log("PROGRESSION PATH QUESTS:", progressionPath.units[0].quests);
    for (let i = 0; i < 2; i++) {
      const quest = progressionPath.units[0].quests[i];
      const challenge = await generateChallengeFunction(
        progressionPath.title,
        progressionPath.description,
        quest
      );

      if (!challenge) {
        return res.status(500).json({
          message: "Failed to generate challenge",
          questNumber: i,
        });
      }

      if (challenge === "pass") {
        continue;
      }

      progressionPath.units[0].quests[i].minigameData =
        new mongoose.Types.ObjectId(challenge._id);
    }
    await progressionPath.save();
    res.json(progressionPath);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

export const getProgressionPathById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const progressionPathId = req.params.id;
    const progressionPath = await ProgressionPathModel.findById(
      progressionPathId
    );
    if (!progressionPath) {
      return res.status(404).json({ message: "Progression path not found" });
    }
    res.json(progressionPath);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid progression path ID" });
    } else {
      next(error);
    }
  }
};

export const updateProgressionPath = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const progressionPathId = req.params.id;
    const updateData = req.body;
    const updatedProgressionPath = await ProgressionPathModel.findByIdAndUpdate(
      progressionPathId,
      updateData,
      {
        new: true,
      }
    );
    if (!updatedProgressionPath) {
      return res.status(404).json({ message: "Progression path not found" });
    }
    res.json(updatedProgressionPath);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid progression path ID" });
    } else {
      next(error);
    }
  }
};
