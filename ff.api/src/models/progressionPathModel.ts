import mongoose, { Document, Schema } from "mongoose";

export interface Quest {
  type: string;
  minigameId?: string;
  minigameData?: mongoose.Types.ObjectId;
  recipeId?: mongoose.Types.ObjectId;
  title: string;
  description: string;
}

interface Unit {
  id: string;
  title: string;
  levels: number;
  description: string;
  quests: Quest[];
}

export interface ProgressionPathDocument extends Document {
  title: string;
  description: string;
  units: Unit[];
  official: boolean;
}

const QuestSchema = new Schema<Quest>({
  type: { type: String, required: true },
  minigameId: { type: String, required: false },
  minigameData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge",
    required: false,
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: false,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const UnitSchema = new Schema<Unit>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  levels: { type: Number, required: true },
  description: { type: String, required: true },
  quests: { type: [QuestSchema], required: true },
});

const ProgressionPathSchema = new Schema<ProgressionPathDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  units: { type: [UnitSchema], required: true },
  official: { type: Boolean, required: true, default: false },
});

export const ProgressionPathModel = mongoose.model<ProgressionPathDocument>(
  "ProgressionPath",
  ProgressionPathSchema
);

console.log("ProgressionPathModel created");
