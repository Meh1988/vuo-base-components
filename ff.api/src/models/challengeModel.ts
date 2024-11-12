import mongoose, { Document, Schema } from "mongoose";

export interface QuizQuestionData {
  type: string;
  question: string;
  options?: string[];
  min?: number;
  max?: number;
  imageUrl?: string;
  correctAnswer: string[];
  feedbackTitle?: string[];
  feedbackMessage?: string[];
}

export type QuizQuestionType =
  | "slider"
  | "single-choice"
  | "multiple-choice"
  | "text-input";

export interface QuizData {
  title: string;
  questions: QuizQuestionData[];
}

interface ConversationStarterData {
  category: string;
  text: string;
}

interface CutGuessrData {
  animal: string;
  animalImage: string;
  name: string;
  image: string;
  description: string;
  cookingTip: string;
  cost: string;
  coordinates: { x: number; y: number };
}

interface ChallengeDocument extends Document {
  uuid?: string; // TODO: remove this
  _id?: string;
  challengeType: string;
  quizData?: QuizData;
  conversationStarterData?: ConversationStarterData[];
  cutGuessrData?: CutGuessrData;
}

const ChallengeSchema: Schema = new Schema({
  uuid: { type: String, required: false, unique: true },
  challengeType: { type: String, required: true },
  quizData: {
    type: {
      title: { type: String, required: true },
      questions: [
        {
          type: { type: String, required: true }, // "slider", "single-choice", etc.
          question: { type: String, required: true },
          options: [{ type: String }], // optional, only for "single-choice" or "multiple-choice"
          min: { type: Number }, // only for "slider"
          max: { type: Number }, // only for "slider"
          correctAnswer: [{ type: String, required: true }],
          feedbackTitle: [{ type: String }],
          feedbackMessage: [{ type: String }],
        },
      ],
    },
    required: false,
  },
  conversationStarterData: [
    {
      category: { type: String, required: true },
      text: { type: String, required: true },
    },
  ],
  cutGuessrData: {
    type: {
      animal: String,
      animalImage: String,
      name: String,
      image: String,
      description: String,
      cookingTip: String,
      cost: String,
      coordinates: {
        x: Number,
        y: Number,
      },
    },
    required: false,
  },
});

const ChallengeModel = mongoose.model<ChallengeDocument>(
  "Challenge",
  ChallengeSchema
);

export default ChallengeModel;

console.log("ChallengeModel created");
