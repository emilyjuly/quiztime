import './styles.css';

const navbar = () => {
  const menuItems = ['Home', 'Topics', 'Rules'];

  return (
    <div className="container-navbar">
      <img alt="Logo quiztime" src="/logo.svg" className="image-navbar" />
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
