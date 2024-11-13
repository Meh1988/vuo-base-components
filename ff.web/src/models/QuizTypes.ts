export interface QuizQuestionData {
  id: string;
  type: QuizQuestionType;
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
    | 'slider'
    | 'single-choice' 
    | 'multiple-choice'
    | 'text-input';

export interface QuizData {
  id: string;
  title: string;
  questions: QuizQuestionData[];

}

export interface UserAnswer {
  questionId: string;
  answer: string[];
}
