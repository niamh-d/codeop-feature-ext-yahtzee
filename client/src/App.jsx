import { Routes, Route } from "react-router-dom";

import { GameProvider } from "./contexts/GameContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SessionProvider } from "./contexts/SessionContext";

// PAGES
import Homepage from "./pages/Homepage";

import "./App.css";
import Header from "./components/Header";
import Game from "./components/Game";

const App = () => {
  return (
    <AuthProvider>
      <SessionProvider>
        <GameProvider>
          <Routes>
            <Route index element={<Homepage />} />
          </Routes>
          {/* 
          <div className="app">
            <Header />
            <Game />
          </div> */}
        </GameProvider>
      </SessionProvider>
    </AuthProvider>
  );
};

export default App;
