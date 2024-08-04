import './styles.css';

const QuizContent = () => {
  return (
    <div className="quiz-container">
      <div className="quiz-container-questions">
        <span className="quiz-number-question">Question 01</span>
        <span className="quiz-question">What does "UX" stand for?</span>
        <div className="quiz-options-question-container">
          <button title="Option" type="button" className="quiz-option">
            User Examination
          </button>
          <button title="Option" type="button" className="quiz-option">
            User Experience
          </button>
          <button title="Option" type="button" className="quiz-option">
            User Extension
          </button>
          <button title="Option" type="button" className="quiz-option">
            User Exercise
          </button>
        </div>
        <div className="quiz-next-button-container">
          <button
            type="button"
            title="Next"
            className="quiz-next-button-disabled"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizContent;
