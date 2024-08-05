import { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  href: string;
  section: string;
  name: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuItems: MenuItem[] = [
    {
      href: '#home',
      section: 'home',
      name: 'Home',
    },
    {
      href: '#topics',
      section: 'topics',
      name: 'Topics',
    },
    {
      href: '#rules',
      section: 'rules',
      name: 'Rules',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      updateActiveSection();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const section = document.querySelector(href);

    if (section) {
      setActiveSection(section.id);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const updateActiveSection = () => {
    let currentSection = 'home';
    menuItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (
        section &&
        section.getBoundingClientRect().top <= window.innerHeight / 2
      ) {
        currentSection = item.section;
      }
    });
    setActiveSection(currentSection);
  };

  return (
    <div className={`container-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <img
        onClick={() => {
          scrollToSection('#home');
          navigate('/');
        }}
        alt="Logo quiztime"
        src="/logo.svg"
        className="image-navbar"
      />
      <div className="options">
        {menuItems.map(({ name, href, section }) => {
          return (
            <button
              key={name}
              type="button"
              title={name}
              className={`menuItemButton ${
                activeSection === section && 'active'
              }`}
              onClick={() => scrollToSection(href)}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
