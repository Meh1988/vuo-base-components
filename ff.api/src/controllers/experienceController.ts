import { NextFunction, Request, Response } from "express";
import UserModel from "../models/userModel";
import mongoose from "mongoose";

export const addExperiencePoints = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.userId;
  const experiencePoints = req.body.experiencePoints;
  if (!userId || !experiencePoints) {
    return res.status(400).json({ message: "Missing userId or experiencePoints" });
  }
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //Initialize experiencePoints if not already set (for old users)
    if (!user.experiencePoints) {
      user.experiencePoints = 0;
    }
    user.experiencePoints += experiencePoints;
    await user.save();
    res.json(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid userId" });
    }
    next(error);
  }
};

export const setExperiencePoints = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.userId;
  const experiencePoints = req.body.experiencePoints;
  if (!userId || !experiencePoints) {
    return res.status(400).json({ message: "Missing userId or experiencePoints" });
  }
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.experiencePoints = experiencePoints;
    await user.save();
    res.json(user);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid userId" });
    }
    else if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: "Invalid experiencePoints" });
    }
    next(error);
  }
};

