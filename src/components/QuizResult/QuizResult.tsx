import { useState } from 'react';
import './styles.css';
import { HiMiniCheck, HiMiniXMark } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';


interface QuestionProps {
  question: string;
  isCorrect: boolean;
}

const QuizResult = () => {
  const questions: QuestionProps[] = [
    { question: '01', isCorrect: true },
    { question: '02', isCorrect: true },
    { question: '03', isCorrect: true },
    { question: '04', isCorrect: false },
    { question: '05', isCorrect: false },
    { question: '06', isCorrect: false },
    { question: '07', isCorrect: true },
    { question: '08', isCorrect: false },
    { question: '09', isCorrect: false },
    { question: '10', isCorrect: false },
  ];

  const [modal, setModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setModal(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => setModal(false), 300);
  };

  return (
    <div className='quiz-result-container'>
      <div className='quiz-result-informations-container'>
        <span className='quiz-result-informations-title'>Your score</span>
        <span className='quiz-result-points'><span className='quiz-result-points-number'>02</span> points</span>
        <span className='quiz-result-description'>
          Your result was below average, but don't be discouraged, study more and try again!
        </span>
        <span className='quiz-result-suggestion'>
          Click on the wrong answers to see the right answer and explanation.
        </span>
        <button onClick={() => navigate('/')} className='quiz-result-button' title="Go to home" type="button">GO TO HOME</button>
      </div>
      <div className='quiz-result-questions-container'>
        {questions.map(({ question, isCorrect }: QuestionProps) => (
          <div
            key={question}
            className={isCorrect ? 'quiz-result-question-card correct' : 'quiz-result-question-card incorrect'}
            onClick={openModal}
          >
            <span>Question {question}</span>
            {isCorrect ? <HiMiniCheck /> : <HiMiniXMark />}
          </div>
        ))}
      </div>
      {modal && (
        <>
          <div className={`overlay ${isClosing ? 'fade-out' : 'fade-in'}`} onClick={closeModal}></div>
          <dialog className={`quiz-result-modal ${isClosing ? 'modal-close' : 'modal-open'}`} open={modal}>
            <span className='quiz-result-modal-top'>
              <p>Question 02</p>
              <HiMiniXMark className='quiz-result-icon' size={20} onClick={closeModal} />
            </span>
            <p>Which of the following is a key principle of UI design?</p>
            <span className='quiz-result-informations-container'>
              <span className='quiz-result-title'>Your answer:</span>
              <span className='quiz-result-incorrect-answer'>Complexity</span>
            </span>
            <span className='quiz-result-informations-container'>
              <span className='quiz-result-title'>Right answer:</span>
              <span className='quiz-result-correct-answer'>Consistency</span>
            </span>
            <span className='quiz-result-informations-container'>
              <span className='quiz-result-title'>Explanation:</span>
              <span>
                Consistency is a key principle of UI design because it helps users recognize patterns and understand the interface more easily. When elements like buttons, fonts, and colors are consistent, users can predict outcomes and navigate the application with less effort, improving their overall experience.
              </span>
            </span>
          </dialog>
        </>
      )}
    </div>
  );
};

export default QuizResult;
