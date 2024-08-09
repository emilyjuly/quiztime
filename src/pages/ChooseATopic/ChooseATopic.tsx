import { useEffect, useState } from 'react';
import { HiLockClosed, HiMiniCheck } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import Tag from '../../components/Tag/Tag';
import { useQuestions } from '../../contexts/QuizResultsContext';
import useLocalStorage from '../../hooks/useLocalStorage';

import './styles.css';

type UserResults = {
  ux: string;
  frontend: string;
  backend: string;
};

const levelsDefault = ['Easy', 'Mid', 'Hard'];

const ChooseATopic = () => {
  const navigate = useNavigate();
  const buttons = ['All', 'Easy', 'Mid', 'Hard'];
  const [filter, setFilter] = useState('All');
  const topics = ['UX/UI Design', 'Backend', 'Frontend'];
  const [levels, setLevels] = useState([...levelsDefault]);
  const { resetQuestions, userLevel, setUserLevel } = useQuestions();
  const [userResults] = useLocalStorage<UserResults>('results', {
    ux: 'Easy',
    frontend: 'Easy',
    backend: 'Easy',
  });

  useEffect(() => {
    resetQuestions();
    setUserLevel(userResults);
  }, []);

  const handleFilter = (button: string) => {
    setFilter(button);
    button === 'All' ? setLevels([...levelsDefault]) : setLevels([button]);
  };

  const handleStart = (topic: string, level: string) => {
    const selectedTopic = topic === 'UX/UI Design' ? 'UX' : topic;
    if (userLevel[topic] === level) {
      navigate(
        `/quiz?topic=${encodeURIComponent(
          selectedTopic,
        )}&level=${encodeURIComponent(level)}`,
      );
    }
  };

  const getCardClass = (topic: string, level: string) => {
    const userLevelValue = userLevel[topic];
    if (userLevelValue === 'Hard') {
      return (level === 'Easy' || level === 'Mid') && 'completed';
    } else if (userLevelValue === 'Mid') {
      return level === 'Easy' && 'completed';
    } else {
      return '';
    }
  };

  return (
    <div className="container-choose">
      <span className="title-choose">Choose a topic</span>
      <span className="subtitle-choose">Choose the topic and click start!</span>
      <div className="container-tag">
        {buttons.map((button) => (
          <div
            key={button}
            className={`container-tag-choose ${
              filter === button ? 'container-tag-choose-active' : ''
            }`}
          >
            <button
              onClick={() => handleFilter(button)}
              title="Filter"
              type="button"
              className="tag-choose"
            >
              {button}
            </button>
          </div>
        ))}
      </div>
      <div className="card-choose-container">
        {levels.map((level) =>
          topics.map((topic, index) => {
            const normalizedTopic =
              topic.toLowerCase() === 'ux/ui design'
                ? 'ux'
                : topic.toLowerCase();

            return (
              <div
                className={`card-choose ${getCardClass(
                  normalizedTopic,
                  level,
                )}`}
                key={topic}
              >
                <p>{`#0${index + 1} topic`}</p>
                <Tag content={level} />
                <h1 className="card-choose-title">{topic}</h1>
                <span className="min-questions-container">
                  <span>3min</span>
                  <span>10 questions</span>
                </span>
                <button
                  onClick={() => handleStart(normalizedTopic, level)}
                  className={`start-button ${
                    level !== userLevel[normalizedTopic] && 'lock'
                  }`}
                  type="button"
                  title="Start"
                  disabled={level !== userLevel[normalizedTopic]}
                >
                  {level === userLevel[normalizedTopic] ? (
                    'START'
                  ) : getCardClass(normalizedTopic, level) === 'completed' ? (
                    <HiMiniCheck size={15} />
                  ) : (
                    <HiLockClosed size={15} />
                  )}
                </button>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
};

export default ChooseATopic;
