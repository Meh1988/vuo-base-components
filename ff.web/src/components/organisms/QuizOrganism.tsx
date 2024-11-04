
import { useState } from 'react';
import QuizResult from '@vuo/components/molecules/QuizResults';
import QuizQuestion from '@vuo/components/molecules/QuizQuestion';
import Button from "@vuo/components/atoms/Button";
import { QuizData, UserAnswer } from '@vuo/models/QuizTypes';

import styles from './Quiz.module.scss';

export default function QuizOrganism({ quiz }: { quiz: QuizData }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showingFeedback, setShowingFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (answer: UserAnswer) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  };

  /*
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };
  */

  const handleNext = () => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const currentAnswer = userAnswers[currentQuestionIndex];

    if (!showingFeedback) {
      // Check if answer is correct and show feedback
      const isAnswerCorrect = Array.isArray(currentQuestion.correctAnswer) && Array.isArray(currentAnswer.answer) ?
        currentAnswer.answer.length === currentQuestion.correctAnswer.length &&
        currentAnswer.answer.every((item) => (currentQuestion.correctAnswer as (string | number)[]).includes(item))
        :
        currentAnswer.answer === currentQuestion.correctAnswer;

      setIsCorrect(isAnswerCorrect);
      setShowingFeedback(true);
    } else if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setShowingFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  if (quizCompleted) {
    return (
      <div className={styles.quizOrganism}>
        <QuizResult quizData={quiz} userAnswers={userAnswers} />
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  if (showingFeedback) {
    const givenAnswerIndex = currentQuestion.options?.findIndex(option => option === userAnswers[currentQuestionIndex].answer);
    return (
      <div className={styles.quizOrganism}>
        <h2 className={styles.quizTitle}>{quiz.title}</h2>

        <div className={styles.quizQuestionContainer}>
          {/*      <h3 className={styles.questionTitle} id={`question-${question.id}`}>{question.question}</h3>
*/}
          <h3 className={styles.questionTitle}>
            {(() => {
              if (currentQuestion.feedbackTitle && Array.isArray(currentQuestion.feedbackTitle) && givenAnswerIndex! >= 0) {
                return currentQuestion.feedbackTitle[givenAnswerIndex!];
              }
              return isCorrect ? 'Correct!' : 'Incorrect!';
            })()}
          </h3>

          <div className={styles.optionsContainer}>
            <p>
              {(() => {
                if (currentQuestion.feedbackMessage && Array.isArray(currentQuestion.feedbackMessage) && givenAnswerIndex! >= 0) {
                  return currentQuestion.feedbackMessage[givenAnswerIndex!];
                } if (currentQuestion.feedbackMessage && !isCorrect) {
                  return currentQuestion.feedbackMessage;
                }
                return isCorrect ? 'You are correct!' : 'But worry not, you\'ll get it right next time.';
              })()}
            </p>
          </div>
        </div>
        <div className={styles.quizNavigation}>
          {/* <Button
        onClick={handlePrevious}
        disabled={currentQuestionIndex === 0}
      >
        Previous
      </Button> */}
          <Button
            onClick={handleNext}
            disabled={!userAnswers[currentQuestionIndex]}
          >
            {/* eslint-disable-next-line no-nested-ternary */}
            {showingFeedback
              ? (currentQuestionIndex === quiz.questions.length - 1 ? 'Finish' : 'Next Question')
              : 'Submit Answer'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quizOrganism}>
      <h2 className={styles.quizTitle}>{quiz.title}</h2>
      <div className={styles.quizQuestionContainer}>
        <QuizQuestion question={currentQuestion} onAnswer={handleAnswer} />
      </div>
      <div className={styles.quizNavigation}>
        {/* <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button> */}
        <Button
          onClick={handleNext}
          disabled={!userAnswers[currentQuestionIndex]}
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {showingFeedback
            ? (currentQuestionIndex === quiz.questions.length - 1 ? 'Finish' : 'Next Question')
            : 'Submit Answer'}
        </Button>
      </div>
    </div>
  );
};
