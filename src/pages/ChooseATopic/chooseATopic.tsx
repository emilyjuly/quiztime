import { useState } from 'react';
import './styles.css';
import { HiLockClosed } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import Tag from '../../components/Tag/tag';

const levelsDefault = ['Easy', 'Mid', 'Hard'];

const chooseATopic = () => {
  const navigate = useNavigate();
  const buttons = ['All', 'Easy', 'Mid', 'Hard'];
  const [filter, setFilter] = useState('All');
  const topics = ['UX/UI Design', 'Backend', 'Frontend'];
  const [levels, setLevels] = useState([...levelsDefault]);

  const handleFilter = (button: string) => {
    setFilter(button);
    button === 'All' ? setLevels([...levelsDefault]) : setLevels([button]);
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
          topics.map((topic, index) => (
            <div className="card-choose" key={topic}>
              <p>{`#0${index + 1} topic`}</p>
              <Tag content={level} />
              <h1 className="card-choose-title">{topic}</h1>
              <span className="min-questions-container">
                <span>3min</span>
                <span>10 questions</span>
              </span>
              <button
                onClick={() => navigate('/quiz')}
                className="start-button"
                type="button"
                title="Start"
              >
                {level === 'Easy' ? 'START' : <HiLockClosed size={15} />}
              </button>
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default chooseATopic;
