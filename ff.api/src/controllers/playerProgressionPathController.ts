import { NextFunction, Request, Response } from "express";
import { ProgressionPathModel } from "../models/progressionPathModel";
import { sendOpenAIRequest } from "../externalAPI/openAI";
import mongoose from "mongoose";
import { PlayerProgressionPathModel } from "../models/playerProgressionPathModel";
import User from "../models/userModel";

/**
 * Create a player progression path
 * @param req: The request
 * @param res: The response
 * @param next: The next function
 * @returns The created player progression path
 */
export const createPlayerProgressionPath = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const progressionPathId = req.body.progressionPathId;
    const userId = req.body.userId;

    console.log(userId, progressionPathId);

    if (!userId || !progressionPathId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const progressionPath = await ProgressionPathModel.findById(
      progressionPathId
    );

    if (!progressionPath) {
      return res.status(404).json({ message: "Progression path not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    delete progressionPath._id;

    const newPlayerProgressionPath = new PlayerProgressionPathModel({
      title: progressionPath.title,
      description: progressionPath.description,
      units: progressionPath.units,
      official: progressionPath.official,
      user: userId,
      progress: {
        unitNumber: 0,
        questNumber: 0,
      },
    });

    await newPlayerProgressionPath.save();
    res.json(newPlayerProgressionPath);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .json({ message: "Invalid progression path data: " + error.message });
    } else {
      next(error);
    }
  }
};

/**
 * Get all player progression paths
 * @param req: The request
 * @param res: The response
 * @param next: The next function
 * @returns The player progression paths
 */
export const getPlayerProgressionPaths = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const playerProgressionPaths = await PlayerProgressionPathModel.find({
      user: userId,
    });
    res.json(playerProgressionPaths);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid user ID" });
    } else {
      next(error);
    }
  }
};

/**
 * Get a player progression path by ID
 * @param req: The request
 * @param res: The response
 * @param next: The next function
 * @returns The player progression path
 */
export const getPlayerProgressionPathById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const playerProgressionPathId = req.params.id;
    const playerProgressionPath = await PlayerProgressionPathModel.findById(
      playerProgressionPathId
    );
    if (!playerProgressionPath) {
      return res
        .status(404)
        .json({ message: "Player progression path not found" });
    }
    res.json(playerProgressionPath);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res
        .status(400)
        .json({ message: "Invalid player progression path ID" });
    } else {
      next(error);
    }
  }
};

/**
 * Update a player progression path
 * @param req: The request
 * @param res: The response
 * @param next: The next function
 * @returns The updated player progression path
 */
export const updatePlayerProgressionPath = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const playerProgressionPathId = req.params.id;
    const updateData = req.body;
    const updatedPlayerProgressionPath =
      await PlayerProgressionPathModel.findByIdAndUpdate(
        playerProgressionPathId,
        updateData,
        {
          new: true,
        }
      );
    if (!updatedPlayerProgressionPath) {
      return res
        .status(404)
        .json({ message: "Player progression path not found" });
    }
    res.json(updatedPlayerProgressionPath);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res
        .status(400)
        .json({ message: "Invalid player progression path ID" });
    } else if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(400)
        .json({
          message: "Invalid player progression path data: " + error.message,
        });
    } else {
      next(error);
    }
  }
};
