import { GameProvider } from "./contexts/GameContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SessionProvider } from "./contexts/SessionContext";

import "./App.css";
import Header from "./components/Header";
import Game from "./components/Game";

const App = () => {
  return (
    <AuthProvider>
      <SessionProvider>
        <GameProvider>
          <div className="app">
            <Header />
            <Game />
          </div>
        </GameProvider>
      </SessionProvider>
    </AuthProvider>
  );
};

export default App;
