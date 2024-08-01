import './App.css';
import Navbar from './components/Navbar/navbar';
import Home from './pages/Home/home';
import ChooseATopic from './pages/ChooseATopic/chooseATopic';

function App() {
  return (
    <div className="container-app">
      <Navbar />
      <Home />
      <ChooseATopic />
    </div>
  );
}

export default App;
