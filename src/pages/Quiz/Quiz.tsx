import './styles.css';

import Navbar from '../../components/Navbar/Navbar';
import QuizContent from '../../components/QuizContent/QuizContent';
import QuizResult from '../../components/QuizResult/QuizResult';
import Tag from '../../components/Tag/Tag';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import questionsMap from '../../jsons/questionsMap';

const Quiz = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const topic =
    queryParams.get('topic') === 'ux'
      ? 'ux/ui design'
      : queryParams.get('topic')?.toLowerCase();
  const level = queryParams.get('level')?.toLowerCase();
  const [questions, setQuestions] = useState([]);

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

  const toCapitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
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
          <Tag content="Easy" />
        </div>
        <QuizContent questions={questions} />
        <QuizResult />
      </div>
    </>
  );
};

export default Quiz;
