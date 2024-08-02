import './styles.css';
import { useNavigate } from 'react-router-dom';

const navbar = () => {
  const navigate = useNavigate();
  const menuItems = ['Home', 'Topics', 'Rules'];

  return (
    <div className="container-navbar">
      <img
        onClick={() => navigate('/')}
        alt="Logo quiztime"
        src="/logo.svg"
        className="image-navbar"
      />
      <div className="options">
        {menuItems.map((menuItem) => (
          <button
            key={menuItem}
            type="button"
            title={menuItem}
            className="menuItemButton"
          >
            {menuItem}
          </button>
        ))}
      </div>
    </div>
  );
};

export default navbar;
