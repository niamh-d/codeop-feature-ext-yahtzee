import { Routes, Route } from "react-router-dom";

// CONTEXTS
import { GameProvider } from "./contexts/GameContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SessionProvider } from "./contexts/SessionContext";

// PAGES
import ProtectedRoute from "./pages/ProtectedRoute";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GamePage from "./pages/GamePage";
import PastPlays from "./pages/PastPlays";
import PageNotFound from "./pages/PageNotFound";

import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <SessionProvider>
        <GameProvider>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route
              path="play"
              element={
                <ProtectedRoute>
                  <GamePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="scores"
              element={
                <ProtectedRoute>
                  <PastPlays />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </GameProvider>
      </SessionProvider>
    </AuthProvider>
  );
};

export default App;
