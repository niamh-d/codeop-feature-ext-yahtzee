import DiceRollingContainer from "./DiceRollingContainer";
import ScoreCard from "./ScoreCard";
import ControllersBox from "./ControllersBox";

import { useGame } from "../contexts/GameContext";

const Game = () => {
  const { countGame } = useGame();

  return (
    <div>
      <h2>Game {countGame}</h2>
      <ControllersBox />
      <div className="container-game">
        <DiceRollingContainer />
        <ScoreCard />
      </div>
    </div>
  );
};

export default Game;
