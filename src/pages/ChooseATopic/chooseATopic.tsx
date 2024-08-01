import { useState } from 'react';
import './styles.css';

const chooseATopic = () => {
  const buttons = ['All', 'Easy', 'Mid', 'Hard'];
  const [filter, setFilter] = useState('');

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
              onClick={() => setFilter(button)}
              title="Filter"
              type="button"
              className="tag-choose"
            >
              {button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default chooseATopic;
