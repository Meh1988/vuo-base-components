export interface QuizQuestionData {
  id: string;
  type: string;
  question: string;
  options?: string[];
  min?: number;
  max?: number;
  imageUrl?: string;
  correctAnswer: Answer;
  feedbackTitle?: string[];
  feedbackMessage?: string | string[];
}

export interface QuizData {
  id: string;
  title: string;
  questions: QuizQuestionData[];

}

export type Answer = string | number | string[] | number[];

export interface UserAnswer {
  questionId: string;
  answer: Answer;
}
