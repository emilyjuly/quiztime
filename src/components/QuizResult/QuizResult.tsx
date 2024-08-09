import { useEffect, useState } from 'react';
import { HiMiniCheck, HiMiniXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useQuestions } from '../../contexts/QuizResultsContext';

import './styles.css';
import useLocalStorage from '../../hooks/useLocalStorage';

interface Result {
  question?: string;
  answer: string;
  rightAnswer: string;
  explanation?: string;
  isCorrect: boolean;
}

type Question = {
  question: string;
  type: string;
  options: string[];
  answer: string;
  explanation: string;
  position: string;
  index: number;
};

type QuizResultProps = {
  topic: string;
};

type UserResults = {
  ux: string;
  frontend: string;
  backend: string;
};

const initialResults: UserResults = {
  ux: 'Easy',
  frontend: 'Easy',
  backend: 'Easy',
};

const QuizResult = ({ topic }: QuizResultProps) => {
  const { questions, answers, setUserLevel, userLevel } = useQuestions();

  const [modal, setModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  const [results, setResults] = useState<Result[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  );
  const [userResults, setUserResults] = useLocalStorage<string>(
    'results',
    initialResults,
  );

  const normalizedTopic = topic === 'ux/ui design' ? 'ux' : topic;

  const suggestions = [
    {
      range: 'low',
      text: `Your result was below average, but don't be discouraged, study more and try again!`,
    },
    {
      range: 'mid',
      text: `You are average, but you can try to improve!`,
    },
    {
      range: 'high',
      text: `Congratulations, your result was above average!`,
    },
  ];

  useEffect(() => {
    const handleAnswers = () => {
      let newPoints: number = 0;
      const newResults: Result[] = questions.map((question, index) => {
        const isCorrect = question.answer === answers[index];
        if (isCorrect) {
          newPoints += 1;
        }
        return {
          question: question.question,
          answer: answers[index],
          rightAnswer: question.answer,
          explanation: question.explanation,
          isCorrect: isCorrect,
        };
      });
      setPoints(newPoints);
      handleUserLevel(newPoints);
      setResults(newResults);
    };

    handleAnswers();
  }, [answers, questions]);

  const handleUserLevel = (points: number) => {
    if (userLevel[normalizedTopic] === 'Easy') {
      if (points > 5) {
        const updatedLevel = {
          ...userLevel,
          [normalizedTopic]: 'Mid',
        };
        setUserLevel((prevLevel) => ({
          ...prevLevel,
          [normalizedTopic]: 'Mid',
        }));
        if (userResults) {
          setUserResults(updatedLevel);
        }
      }
    } else if (userLevel[normalizedTopic] === 'Mid') {
      points > 5 &&
        setUserLevel((prevLevel) => ({
          ...prevLevel,
          [normalizedTopic]: 'Hard',
        }));
    }
  };

  const openModal = (isCorrect: boolean, index: number) => {
    const positionIndex = index + 1;
    const position: string =
      positionIndex <= 9 ? `0${positionIndex}` : positionIndex.toString();
    !isCorrect && setModal(true);
    setIsClosing(false);
    setSelectedQuestion({ ...questions[index], position, index });
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => setModal(false), 300);
  };

  const getRangeMessage = (points: number) => {
    if (points < 5) {
      return suggestions.find((s) => s.range === 'low')?.text;
    } else if (points === 5) {
      return suggestions.find((s) => s.range === 'mid')?.text;
    } else if (points > 5) {
      return suggestions.find((s) => s.range === 'high')?.text;
    } else {
      return '';
    }
  };

  return (
    <div className="quiz-result-container">
      <div className="quiz-result-informations-container">
        <span className="quiz-result-informations-title">Your score</span>
        <span className="quiz-result-points">
          <span className="quiz-result-points-number">
            {points <= 9 ? `0${points}` : points}
          </span>
          points
        </span>
        <span className="quiz-result-description">
          {getRangeMessage(points)}
        </span>
        <span className="quiz-result-suggestion">
          Click on the wrong answers to see the right answer and explanation.
        </span>
        <button
          onClick={() => navigate('/')}
          className="quiz-result-button"
          title="Go to home"
          type="button"
        >
          GO TO HOME
        </button>
      </div>
      <div className="quiz-result-questions-container">
        {results.map((result, index) => (
          <div
            key={index}
            className={
              result.isCorrect
                ? 'quiz-result-question-card correct'
                : 'quiz-result-question-card incorrect'
            }
            onClick={() => openModal(result.isCorrect, index)}
          >
            <span>Question {index + 1}</span>
            {result.isCorrect ? <HiMiniCheck /> : <HiMiniXMark />}
          </div>
        ))}
      </div>
      {modal && (
        <>
          <div
            className={`overlay ${isClosing ? 'fade-out' : 'fade-in'}`}
            onClick={closeModal}
          ></div>
          <dialog
            className={`quiz-result-modal ${
              isClosing ? 'modal-close' : 'modal-open'
            }`}
            open={modal}
          >
            <span className="quiz-result-modal-top">
              <p>Question {selectedQuestion && selectedQuestion.position}</p>
              <HiMiniXMark
                className="quiz-result-icon"
                size={20}
                onClick={closeModal}
              />
            </span>
            {selectedQuestion && (
              <>
                <p>{selectedQuestion.question}</p>
                <span className="quiz-result-informations-container">
                  <span className="quiz-result-title">Your answer:</span>
                  <span className="quiz-result-incorrect-answer">
                    {answers[selectedQuestion.index]}
                  </span>
                </span>
                <span className="quiz-result-informations-container">
                  <span className="quiz-result-title">Right answer:</span>
                  <span className="quiz-result-correct-answer">
                    {selectedQuestion.answer}
                  </span>
                </span>
                <span className="quiz-result-informations-container">
                  <span className="quiz-result-title">Explanation:</span>
                  <span>{selectedQuestion.explanation}</span>
                </span>
              </>
            )}
          </dialog>
        </>
      )}
    </div>
  );
};

export default QuizResult;
