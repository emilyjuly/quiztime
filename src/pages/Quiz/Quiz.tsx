import Navbar from '../../components/Navbar/Navbar';
import QuizContent from '../../components/QuizContent/QuizContent';
import QuizResult from '../../components/QuizResult/QuizResult';
import Tag from '../../components/Tag/Tag';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import questionsMap from '../../jsons/questionsMap';
import { useQuestions } from '../../contexts/QuizResultsContext';

import './styles.css';

const Quiz = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const topic =
    queryParams.get('topic') === 'ux'
      ? 'ux/ui design'
      : queryParams.get('topic')?.toLowerCase();
  const level = queryParams.get('level')?.toLowerCase();
  const [timeLeft, setTimeLeft] = useState(180);
  const timerRef = useRef<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const { setQuestions } = useQuestions();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (topic && level) {
          const questionsLoader = questionsMap[topic][level];
          if (questionsLoader) {
            const questionsModule = await questionsLoader();
            setQuestions(questionsModule.default);
          } else {
            console.error('Invalid topic or level');
          }
        }
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };

    fetchQuestions();
  }, [topic, level]);

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsFinished(true);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, isFinished]);

  const stopTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsFinished(true);
  };

  const toCapitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleFinish = () => {
    setIsFinished(true);
    stopTimer();
  };

  return (
    <>
      <Navbar />
      <div className="quiz-page-container">
        <h1 className="quiz-title">
          {topic && topic === 'ux' ? 'UX/UI Design' : toCapitalize(topic ?? '')}
        </h1>
        <div className="quiz-tag-container">
          <Tag content={level ? toCapitalize(level ?? '') : ''} />
          <Tag
            content={`${Math.floor(timeLeft / 60)}:${
              timeLeft % 60 < 10 ? '0' : ''
            }${timeLeft % 60}`}
            className={timeLeft <= 30 ? 'alert' : ''}
          />
        </div>
        {isFinished ? <QuizResult /> : <QuizContent onFinish={handleFinish} />}
      </div>
    </>
  );
};

export default Quiz;
