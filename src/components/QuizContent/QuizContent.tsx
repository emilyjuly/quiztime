import { useState } from 'react';
import './styles.css';
import { HiMiniCheck } from 'react-icons/hi2';

interface QuizContentProps {
  questions: Question[];
}

type Question = {
  question: string;
  type: string;
  options: string[];
  answer: string;
  explanation: string;
};

const QuizContent = ({ questions }: QuizContentProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill(''),
  );

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
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

  const handleFinish = () => {};

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
      <div className="quiz-container-questions">
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
