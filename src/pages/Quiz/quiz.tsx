import './styles.css';
import Navbar from '../../components/Navbar/Navbar';
import QuizContent from '../../components/QuizContent/QuizContent';
import QuizResult from '../../components/QuizResult/QuizResult';
import Tag from '../../components/Tag/tag';

const Quiz = () => {
  return (
    <>
      <Navbar />
      <div className="quiz-page-container">
        <h1 className="quiz-title">UX/UI Design</h1>
        <div className="quiz-tag-container">
          <Tag content="Easy" />
          <Tag content="Easy" />
        </div>
        <div className="quiz-progress-container">
          <div className="quiz-progress-bar"></div>
        </div>
        <QuizContent />
        <QuizResult />
      </div></>
  );
};

export default Quiz;
