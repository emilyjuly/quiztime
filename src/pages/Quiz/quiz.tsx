import './styles.css';
import Navbar from '../../components/Navbar/navbar';
import Tag from '../../components/Tag/tag';

const quiz = () => {
  return (
    <div className="quiz-container">
      <Navbar />
      <div className="quiz-container-questions">
        <h1 className="quiz-title">UX/UI Design</h1>
        <div className="quiz-tag-container">
          <Tag content="Easy" />
          <Tag content="Easy" />
        </div>
        <div className="quiz-progress-container">
          <div className="quiz-progress-bar"></div>
        </div>
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

export default quiz;
