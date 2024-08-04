import { useEffect, useRef, useState } from 'react';
import './styles.css';
import Navbar from '../../components/Navbar/Navbar';
import ChooseATopic from '../ChooseATopic/ChooseATopic';

interface Circle {
  title: string;
  position: string;
}

const Home = () => {
  const [circles, setCircles] = useState<Circle[]>([
    {
      title: 'Frontend',
      position: '03',
    },
    {
      title: 'Backend',
      position: '02',
    },
    {
      title: 'UX/UI Design',
      position: '01',
    },
  ]);

  const homeSectionRef = useRef<HTMLDivElement>(null);
  const topicsSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCircles((prevCircles) => {
        const newCircles: Circle[] = [...prevCircles];
        const lastItem: Circle = newCircles.pop() ?? {
          title: '',
          position: '',
        };
        newCircles.unshift(lastItem);

        return newCircles.map((circle) => ({
          ...circle,
        }));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container-app">
      <Navbar
        onHomeClick={() => handleScrollToSection(homeSectionRef)}
        onTopicsClick={() => handleScrollToSection(topicsSectionRef)}
      />
      <div ref={homeSectionRef} id="home-section" className="container-home">
        <div className="container-circle">
          {circles.map(({ position, title }, index) => (
            <div className={`circle circle-${index + 1}`} key={index}>
              <p className="title">{`#${position} Topic`}</p>
              <p className="quiz-name">{title}</p>
              <p className="informations-circle">
                <span>3min</span>
                <span>10 questions</span>
              </p>
            </div>
          ))}
        </div>
        <div className="container-title">
          <h1 className="title-home">
            Improve <br />
            your mind
          </h1>
          <div className="container-text-home">
            <p className="text-home">
              Do you want to test your technology knowledge? Choose a theme and
              have fun!
            </p>
          </div>
        </div>
      </div>
      <div ref={topicsSectionRef} id="topics-section">
        <ChooseATopic />
      </div>
    </div>
  );
};

export default Home;
