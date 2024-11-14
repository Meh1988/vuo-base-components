import { NextFunction, Request, Response } from "express";
import { ProgressionPathModel } from "../models/progressionPathModel";
import { sendOpenAIRequest } from "../externalAPI/openAI";
import mongoose from "mongoose";
import { PlayerProgressionPathModel } from "../models/playerProgressionPathModel";
import User from "../models/userModel";

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
      return res.status(400).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

export const getPlayerProgressionPaths = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId;
    const playerProgressionPaths = await PlayerProgressionPathModel.find({
      user: userId,
    });
    res.json(playerProgressionPaths);
  } catch (error) {
    next(error);
  }
};

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
    next(error);
  }
};

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
    next(error);
  }
};
