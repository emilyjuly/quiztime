import { useState } from 'react';
import { HiMiniCheck } from 'react-icons/hi2';
import { useQuestions } from '../../contexts/QuizResultsContext';

import './styles.css';

interface QuizContentProps {
  onFinish: () => void;
}

const QuizContent = ({ onFinish }: QuizContentProps) => {
  const { questions, setAnswers, answers } = useQuestions();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('quiz-question-enter');

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setAnimationClass('quiz-question-exit');
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnimationClass('quiz-question-enter');
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setAnimationClass('quiz-question-exit');
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setAnimationClass('quiz-question-enter');
      }, 300);
    }
  };

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleAnswerChange(value);
  };

  const handleFinish = () => {
    onFinish();
  };

  return (
    <div className="quiz-container">
      <div className="quiz-progress-container">
        {questions.length > 0 &&
          questions.map((question, index) => (
            <div
              key={index}
              className={`quiz-progress-bar ${
                index === currentQuestionIndex ? 'quiz-progress-bar-active' : ''
              }`}
            />
          ))}
      </div>
      <div className="quiz-questions-container">
        <span className="quiz-number-question">{`Question ${
          currentQuestionIndex + 1 < 10
            ? `0${currentQuestionIndex + 1}`
            : currentQuestionIndex + 1
        }`}</span>
        <span className="quiz-question">{currentQuestion.question}</span>
        <div className="quiz-options-question-container">
          {currentQuestion.options ? (
            currentQuestion.options.map((option, index) => (
              <button
                key={index}
                title="Option"
                type="button"
                className={`quiz-option ${
                  currentAnswer === option ? 'quiz-option-selected' : ''
                }`}
                onClick={() => handleAnswerChange(option)}
              >
                {option}
                {currentAnswer === option && <HiMiniCheck />}
              </button>
            ))
          ) : (
            <>
              <label htmlFor="answer">Answer:</label>
              <input
                value={currentAnswer}
                onChange={handleInputChange}
                className="input"
                type="text"
                id="answer"
                name="answer"
              />
            </>
          )}
        </div>
        <div className="quiz-next-button-container">
          <button
            type="button"
            title="BACK"
            className="quiz-next-button"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            BACK
          </button>
          {currentQuestionIndex === questions.length - 1 ? (
            <button
              type="button"
              title="Finish"
              className="quiz-next-button"
              onClick={handleFinish}
            >
              FINISH
            </button>
          ) : (
            <button
              type="button"
              title={`${
                currentAnswer === ''
                  ? 'Select at least one option to go to the next question'
                  : 'NEXT'
              }`}
              className="quiz-next-button"
              onClick={handleNext}
              disabled={!currentAnswer}
            >
              NEXT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizContent;
