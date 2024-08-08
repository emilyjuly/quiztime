import { ReactNode, createContext, useContext, useState } from 'react';

type Question = {
  question: string;
  type: string;
  options: string[];
  answer: string;
  explanation: string;
};

type UserLevel = {
  [topic: string]: string;
};

interface QuestionsContextType {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  answers: string[];
  setAnswers: (answers: string[]) => void;
  resetQuestions: () => void;
  userLevel: UserLevel;
  setUserLevel: (
    level: UserLevel | ((prevLevel: UserLevel) => UserLevel),
  ) => void;
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(
  undefined,
);

export const QuestionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [userLevel, setUserLevel] = useState<UserLevel>({
    ux: 'Easy',
    frontend: 'Easy',
    backend: 'Easy',
  });

  const resetQuestions = () => {
    setQuestions([]);
    setAnswers([]);
  };

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        setQuestions,
        answers,
        setAnswers,
        resetQuestions,
        userLevel,
        setUserLevel,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
};
