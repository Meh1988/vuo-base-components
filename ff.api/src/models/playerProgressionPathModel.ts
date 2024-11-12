import mongoose, { Document, Schema } from "mongoose";

interface Quest {
  id: mongoose.Schema.Types.ObjectId;
  type: string;
  minigameId: string;
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

interface Progress {
  unitNumber: number;
  questNumber: number;
}

const ProgressSchema = new Schema<Progress>({
  unitNumber: { type: Number, required: true },
  questNumber: { type: Number, required: true },
});

export interface PlayerProgressionPathDocument extends Document {
  title: string;
  description: string;
  units: Unit[];
  progress: Progress[];
}

const QuestSchema = new Schema<Quest>({
  id: { type: mongoose.Schema.Types.ObjectId, required: true },
  type: { type: String, required: true },
  minigameId: { type: String, required: true },
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

const PlayerProgressionPathSchema = new Schema<PlayerProgressionPathDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  units: { type: [UnitSchema], required: true },
  progress: { type: [ProgressSchema], required: true },
});

export const PlayerProgressionPathModel =
  mongoose.model<PlayerProgressionPathDocument>(
    "PlayerProgressionPath",
    PlayerProgressionPathSchema
  );
