import { NextFunction, Request, Response } from "express";
import Recipe from "../models/recipeModel";
import { sendOpenAIRequest } from "../externalAPI/openAI";
import mongoose from "mongoose";
import OpenAI from "openai";

/** Get the step breakdown for a recipe step
 * @param req: The request body containing the recipeId and stepNo
 * @param res: The response to send to the client
 * @param next: The next function to pass the error to error handler middleware
 */
export async function getStepBreakdown(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { recipeId, stepNo } = req.body;
  // Specific response format for step breakdown
  const response_format = {
    type: "json_schema",
    json_schema: {
      name: "step_breakdown",
      schema: {
        type: "object",
        properties: {
          subSteps: {
            type: "array",
            items: {
              attachable: { type: "boolean" },
              text: { type: "string" },
            },
            required: ["attachable", "text"],
          },
        },
      },
    },
  };
  try {
    const recipe = await Recipe.findById(recipeId);
    console.log("FINDING:", recipeId);
    if (!recipe) {
      console.log("Recipe not found");
      return res.status(404).send({ message: "Recipe not found" });
    }
    const step = recipe.steps[stepNo];
    if (!step) {
      return res.status(404).send({ message: "Step does not exist" });
    }
    if (step.subSteps && step.subSteps.length > 0)
      return res.status(400).send({ message: "Step already has sub steps" });
    const messages = [
      {
        role: "user",
        content: `Here is a step in a recipe: ${step}
          Break down the above step into smaller steps that make it easier to follow. Do not include index numbers for the sub steps. The number of sub steps ranged from 1 to 5.
          Generate response as an array of json objects in the following format: [{attachable: false, text: string}]`,
      },
    ] as OpenAI.ChatCompletionMessageParam[];
    const response = await sendOpenAIRequest(messages, response_format);
    recipe.steps[stepNo].subSteps = response.subSteps;
    return res.json(recipe);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .json({ message: "Validation Error", details: error.errors });
    } else {
      next(error);
    }
  }
}

export async function updateStepBreakdown(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const recipe = req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipe._id, recipe, {
      new: true,
    });
    return res.json(updatedRecipe);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .json({ message: "Validation Error", details: error.errors });
    } else if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid recipe ID" });
    } else {
      next(error);
    }
  }
}
