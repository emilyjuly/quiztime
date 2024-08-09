import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ChooseATopic from '../ChooseATopic/ChooseATopic';
import Rules from '../Rules/Rules';

import './styles.css';

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
      <Navbar />
      <section className="container-home" id="home">
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
      </section>
      <section id="topics">
        <ChooseATopic />
      </section>
      <section id="rules">
        <Rules />
      </section>
    </div>
  );
};

export default Home;
