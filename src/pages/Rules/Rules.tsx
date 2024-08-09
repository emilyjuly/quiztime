import { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';

import './styles.css';

const Rules = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const rules = [
    {
      label: 'General Rules',
      rules: [
        {
          title: 'Quiz Duration',
          text: 'Each quiz has a maximum duration of 3 minutes.',
        },
        {
          title: 'Number of Questions',
          text: 'Each quiz consists of 10 questions.',
        },
        {
          title: 'Topics',
          text: 'The quiz covers three main topics: UX/UI Design, Backend, and Frontend.',
        },
        {
          title: 'Levels',
          text: 'Each topic is divided into three levels: Easy, Medium, and Hard.',
        },
      ],
    },
    {
      label: 'Scoring and Progression',
      rules: [
        {
          title: 'Scoring',
          text: [
            'Each correct answer earns 10 points.',
            'No points are deducted for incorrect answers.',
          ],
        },
        {
          title: 'Progression',
          text: [
            'Players must complete the Easy level to unlock the Medium level for each topic.',
            'Players must complete the Medium level to unlock the Hard level for each topic.',
          ],
        },
        {
          title: 'Completion',
          text: [
            'Players who complete all three levels in a topic will receive a certificate of completion for that topic.',
            'Players who complete all levels in all three topics will receive a master certificate.',
          ],
        },
      ],
    },
    {
      label: 'Additional Rules',
      rules: [
        {
          title: 'Time Management',
          text: [
            'Players must manage their time effectively to answer all questions within the 3-minute limit.',
            'There is no penalty for unanswered questions, but they do not contribute to the score.',
          ],
        },
        {
          title: 'Cheating',
          text: [
            'Use of external resources or assistance during the quiz is strictly prohibited.',
            'Any violation of this rule will result in immediate disqualification.',
          ],
        },
        {
          title: 'Feedback',
          text: 'At the end of each quiz, players will receive feedback on their performance, including correct answers and explanations.',
        },
      ],
    },
  ];

  const toggleCollapse = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="container-rules">
      <span className="title-rules">Rules</span>
      <span className="subtitle-rules">Come read the quiz rules!</span>
      <div className="container-collapse-rules">
        {rules.map((ruleGroup, index) => (
          <div key={ruleGroup.label}>
            <div className="label-rule" onClick={() => toggleCollapse(index)}>
              <span className="label-rule-content">
                {ruleGroup.label}
                {expandedIndex === index ? <HiChevronUp /> : <HiChevronDown />}
              </span>
            </div>
            {expandedIndex === index && (
              <ol className="content-rule">
                {ruleGroup.rules.map((rule) => (
                  <li className="list-rule" key={rule.title}>
                    <span className="rule-title">{rule.title}:</span>
                    {Array.isArray(rule.text) ? (
                      <ul>
                        {rule.text.map((text, textIndex) => (
                          <li key={textIndex}>{text}</li>
                        ))}
                      </ul>
                    ) : (
                      <span>{rule.text}</span>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;
