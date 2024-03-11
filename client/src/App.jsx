import React from "react";

import "./App.css";

import ScoreBoard from "./components/ScoreBoard";
import DiceBox from "./components/DiceBox";

const App = () => {
  return (
    <div className="app">
      <div>
        <h1>Yahtzee</h1>
        <div>
          <button className="btn__roll">Roll dice</button>
          <h2>Your roll</h2>
          <DiceBox />
        </div>
        <ScoreBoard />
      </div>
    </div>
  );
};

export default App;
