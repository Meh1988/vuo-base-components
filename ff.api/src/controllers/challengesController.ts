import { Request, response, Response } from "express";
import ChallengeModel from "../models/challengeModel";
import { ProgressionPathModel } from "../models/progressionPathModel";
import mongoose from "mongoose";
import crypto from "crypto";
import { Quest } from "../models/progressionPathModel";
import { sendOpenAIRequest } from "../externalAPI/openAI";
import OpenAI from "openai";

export const createChallenge = async (req: Request, res: Response) => {
  const challenge = new ChallengeModel(req.body);
  // challenge.uuid = crypto.randomUUID(); // TODO: remove this
  try {
    await challenge.save();
    res.json(challenge);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      console.log(error);
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Server error", error });
    }
  }
};

export const getChallengeById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const challenge = await ChallengeModel.findById(id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const generateChallengeFunction = async (
  progressionPathTitle: string,
  progressionPathDescription: string,
  quest: Quest
) => {
  console.log("GENERATION STARTED");
  if (quest.minigameId === "cut-guessr") {
    const messages = [
      {
        role: "system",
        content: `You are a helpful assistant that selects a cut from an animal based on the provided context. The context is a progression path title and description. The cut is a part of the animal that is relevant to the progression path.`,
      },
      {
        role: "assistant",
        content: `{
          "animal": "Cow",
          "cut": "Ribeye"
        }`,
      },
      {
        role: "user",
        content: `Select a cut from an animal that is relevant to the following progression path data: Title: ${progressionPathTitle}, Description: ${progressionPathDescription}
        The response should be in the following format: {
          "animal": string,
          "cut": string
        }
        For the animal, select from the following list: Cow, Pig, Chicken
        For the cut, select from the following list: Beef ribeye, Chicken breast, Pork loin.
        Make sure the cut is part of the selected animal.`,
      },
    ] as OpenAI.ChatCompletionMessageParam[];
    const response_format = {
      type: "json_schema",
      json_schema: {
        name: "cut_guessr_challenge",
        schema: {
          type: "object",
          properties: {
            animal: { type: "string" },
            cut: { type: "string" },
          },
          required: ["animal", "cut"],
        },
      },
    };
    const response = await sendOpenAIRequest(messages, response_format);
    console.log("RESPONSE:", response);
    const data = await ChallengeModel.find({
      challengeType: "cut-guessr",
      "cutGuessrData.animal": new RegExp(`^${response.animal}$`, "i"),
      "cutGuessrData.name": new RegExp(`^${response.cut}$`, "i"),
    });

    console.log("CHALLENGE ID AT FUNCTION:", data);
    return data[0];
  } else if (quest.minigameId === "quiz") {
    const messages = [
      {
        role: "system",
        content: `You are a helpful assistant that generates a quiz based on the provided context. The context is a progression path title and description, as well as the quiz title and description. The questions must be relevant to the progression path and the quiz.`,
      },
      {
        role: "assistant",
        content: `
        {
          "quizData": {
            "title": "Delicious Food Quiz",
            "questions": [
              {
                "type": "slider",
                "question": "How many minutes does it typically take to cook spaghetti?",
                "options": [],
                "min": 0,
                "max": 60,
                "correctAnswer": [
                  "10"
                ],
                "feedbackTitle": [],
                "feedbackMessage": [],
              },
              {
                "type": "single-choice",
                "question": "Which cuisine is sushi from?",
                "options": [
                  "Chinese",
                  "Japanese",
                  "Korean",
                  "Thai"
                ],
                "correctAnswer": [
                  "Japanese"
                ],
                "feedbackTitle": [],
                "feedbackMessage": [],
              },
              {
                "type": "multiple-choice",
                "question": "Which of the following are types of pasta?",
                "options": [
                  "Penne",
                  "Fusilli",
                  "Ravioli",
                  "Risotto"
                ],
                  "correctAnswer": [
                  "Penne",
                  "Fusilli",
                  "Ravioli"
                ],
                "feedbackTitle": [],
                "feedbackMessage": [],
              },
              {
                "type": "text-input",
                "question": "What is the main ingredient in guacamole?",
                "options": [],
                "correctAnswer": [
                  "avocado"
                ],
                "feedbackTitle": [],
                "feedbackMessage": [],    
              }
            ],
          }`,
      },
      {
        role: "user",
        content: `Generate a quiz with the following title and description: ${quest.title}, ${quest.description}. The quiz is for the following progression path: ${progressionPathTitle}, ${progressionPathDescription}
        The response should be in the following format: {
          "quizData": {
            "title": string,
            "questions": [
              {
                "type": string,
                "min": number,
                "max": number,
                "question": string,
                "options": string[],
                "correctAnswer": string[],
                "feedbackTitle": string[],
                "feedbackMessage": string[],
              }
            ]
          }
        }
        The title of the quiz should be ${quest.title},
        The questions should be relevant to the progression path and the quiz.
        The number of questions should be between 3 and 5.
        The type of a question must be selected from the following list: slider, single-choice, multiple-choice, text-input.
        For the slider type, the question must be a question that can be answered with a number. The min and max values must create a range that includes the correct answer. The correct answer must be an array of strings that contains only one number that is within the range of the min and max values. The options array should be empty.
        For the single-choice type, the question must be a question that can be answered with a single choice from a list of 4 options. The options array should contain 2-4 strings (could be True/False). The correct answer must be an array of strings that contains only one string that is one of the options. The min and max values should be empty. The feedbackTitle should be an array of strings that are short comments that are shown when the answer is correct or incorrect, the order of the strings must be the same as the order of the options. The feedbackMessage should be an array of strings that are longer comments that are shown when the answer is correct or incorrect, the order of the strings must be the same as the order of the options. 
        For the multiple-choice type, the question must be a question that can be answered with multiple choices from a list of 4 options. The options array should contain 4 strings. The correct answer must be an array of strings that contains strings that are one of the options. The min and max values should be empty. The feedbackTitle should be an array of strings that are short comments that are shown when the answer is correct or incorrect, the order of the strings must be the same as the order of the options. The feedbackMessage should be an array of strings that are longer comments that are shown when the answer is correct or incorrect, the order of the strings must be the same as the order of the options.
        For the text-input type, the question must be a question that can be answered with a single word or phrase. The options array must be empty. The correct answer must be an array of strings that contains only one string that is the correct answer. The min and max values must be empty.`,
      },
    ] as OpenAI.ChatCompletionMessageParam[];
    const response_format = {
      type: "json_schema",
      json_schema: {
        name: "quiz_challenge",
        schema: {
          type: "object",
          properties: {
            quizData: {
              type: "object",
              properties: {
                title: { type: "string" },
                questions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: { type: "string" },
                      min: { type: "number" },
                      max: { type: "number" },
                      question: { type: "string" },
                      options: {
                        type: "array",
                        items: { type: "string" },
                      },
                      correctAnswer: {
                        type: "array",
                        items: { type: "string" },
                      },
                      feedbackTitle: {
                        type: "array",
                        items: { type: "string" },
                      },
                      feedbackMessage: {
                        type: "array",
                        items: { type: "string" },
                      },
                    },
                    required: [
                      "type",
                      "question",
                      "correctAnswer",
                      "feedbackTitle",
                      "feedbackMessage",
                    ],
                  },
                },
              },
              required: ["title", "questions"],
            },
          },
          required: ["quizData"],
        },
      },
    };
    const response = await sendOpenAIRequest(messages, response_format);
    const newChallenge = new ChallengeModel({
      challengeType: quest.minigameId,
      quizData: response.quizData,
    });
    await newChallenge.save();
    console.log("CHALLENGE ID AT FUNCTION:", newChallenge._id);
    return newChallenge;
  } else if (quest.minigameId === "conversation-starter") {
    const messages = [
      {
        role: "system",
        content: `You are a helpful assistant that generates a set of topics to discuss based on the provided context. The context is a progression path title and description, as well as the topics set title and description. The topics must be relevant to the progression path and the topic.`,
      },
      {
        role: "assistant",
        content: `
        {
          "conversationStarterData": [
            {
              "category": "Childhood",
              "text": "What is your favorite dish from your childhood?"
            },
            {
              "category": "History",
              "text": "What is the most interesting fact about food history that you know?"
            },
            {
              "category": "Travel",
              "text": "What is the most interesting fact about food from a different culture that you know?"
            },
            {
              "category": "Skill",
              "text": "What is the best cooking tip that you know?"
            },
            {
              "category": "Advice",
              "text": "What is the best advice that you have for someone who is new to cooking?"
            },
            {
              "category": "Fiction",
              "text": "What is your favorite food-related book or movie?"
            }
          ]
        }`,
      },
      {
        role: "user",
        content: `Generate a set of topics to discuss with the following set title and description: ${quest.title}, ${quest.description}. The topics are for the following progression path: ${progressionPathTitle}, ${progressionPathDescription}
        The response should be in the following format: {
          "conversationStarterData": [
            {
              "category": string,
              "text": string
            }
          ]
        }
        The set of topics should be relevant to the progression path and the set of topics.
        The number of topics should be 10.
        The category of a topic must be selected from the following list: Childhood, History, Travel, Skill, Advice, Fiction`,
      },
    ] as OpenAI.ChatCompletionMessageParam[];
    const response_format = {
      type: "json_schema",
      json_schema: {
        name: "conversation_starter_challenge",
        schema: {
          type: "object",
          properties: {
            conversationStarterData: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  category: { type: "string" },
                  text: { type: "string" },
                },
                required: ["category", "text"],
              },
            },
          },
          required: ["conversationStarterData"],
        },
      },
    };
    const response = await sendOpenAIRequest(messages, response_format);
    const newChallenge = new ChallengeModel({
      challengeType: quest.minigameId,
      conversationStarterData: response.conversationStarterData,
    });
    await newChallenge.save();
    console.log("CHALLENGE ID AT FUNCTION:", newChallenge._id);
    return newChallenge;
  } else {
    throw new Error("Invalid minigame ID");
  }
};

export const generateChallenge = async (req: Request, res: Response) => {
  console.log("REQUEST RECEIVED");
  try {
    const { progressionPathId, unitNumber, questNumber } = req.body;
    const progressionPath = await ProgressionPathModel.findById(
      progressionPathId
    );
    if (!progressionPath) {
      return res.status(404).json({ message: "Progression path not found" });
    }

    if (
      isNaN(unitNumber) ||
      unitNumber < 0 ||
      unitNumber >= progressionPath.units.length
    ) {
      return res.status(400).json({ message: "Invalid unit number" });
    }

    const unit = progressionPath.units[unitNumber];

    if (!questNumber || !Array.isArray(questNumber)) {
      return res.status(400).json({ message: "Invalid quest number" });
    }

    for (const number of questNumber) {
      if (isNaN(number) || number < 0 || number >= unit.quests.length) {
        return res
          .status(400)
          .json({ message: `Invalid quest number: ${number}` });
      }

      const quest = unit.quests[number];
      const challenge = await generateChallengeFunction(
        progressionPath.title,
        progressionPath.description,
        quest
      );

      if (!challenge || Array.isArray(challenge)) {
        return res.status(500).json({
          message: "Failed to generate challenge",
          questNumber: number,
        });
      }

      console.log("CHALLENGE ID AT ENDPOINT:", challenge._id);
      progressionPath.units[unitNumber].quests[number].minigameData =
        new mongoose.Types.ObjectId(challenge._id);
    }

    await progressionPath.save();
    res.json(progressionPath);
  } catch (error) {
    console.error("Generate challenge error:", error);
    res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
