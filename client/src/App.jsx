import { GameProvider } from "./contexts/GameContext";
import "./App.css";
import Header from "./components/Header";
import Game from "./components/Game";

const App = () => {
  return (
    <GameProvider>
      <div className="app">
        <Header />
        <Game />
      </div>
    </GameProvider>
  );
};

export default App;
