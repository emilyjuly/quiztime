import { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onHomeClick, onTopicsClick }) => {
  const navigate = useNavigate();
  const menuItems = ['Home', 'Topics', 'Rules'];
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleItemClick = (menuItem: string) => {
    if (menuItem === 'Topics') {
      onTopicsClick();
      setActiveItem('Topics');
    } else if (menuItem === 'Home') {
      onHomeClick();
      setActiveItem('Home');
    } else {
      navigate(menuItem === 'Home' ? '/' : `/${menuItem.toLowerCase()}`);
      setActiveItem(menuItem);
    }
  };

  return (
    <div className={`container-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <img
        onClick={() => {
          navigate('/');
          setActiveItem('Home');
          handleItemClick('Home');
        }}
        alt="Logo quiztime"
        src="/logo.svg"
        className="image-navbar"
      />
      <div className="options">
        {menuItems.map((menuItem) => {
          return (
            <button
              key={menuItem}
              type="button"
              title={menuItem}
              className={`menuItemButton ${activeItem === menuItem ? 'active' : ''}`}
              onClick={() => handleItemClick(menuItem)}
            >
              {menuItem}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
