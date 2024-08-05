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
  const [answer, setAnswer] = useState('');

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer('');
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-container-questions">
        <span className="quiz-number-question">{`Question ${
          currentQuestionIndex + 1 >= 1 || currentQuestionIndex + 1 <= 9
            ? `0${currentQuestionIndex + 1}`
            : currentQuestionIndex + 1
        }`}</span>
        <span className="quiz-question">{currentQuestion.question}</span>
        <div className="quiz-options-question-container">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              title="Option"
              type="button"
              className={`quiz-option ${
                answer === option ? 'quiz-option-selected' : ''
              }`}
              onClick={() => setAnswer(option)}
            >
              {option}
              {answer === option && <HiMiniCheck />}
            </button>
          ))}
        </div>
        <div className="quiz-next-button-container">
          <button
            type="button"
            title={`${
              answer === ''
                ? 'Select at least one option to go to the next question'
                : 'NEXT'
            }`}
            className="quiz-next-button"
            onClick={handleNext}
            disabled={answer === ''}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizContent;
