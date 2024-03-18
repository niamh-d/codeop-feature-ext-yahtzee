import DiceRollingContainer from "./DiceRollingContainer";
import ScoreCard from "./ScoreCard";
import ControllersBox from "./ControllersBox";

import { useGame } from "../contexts/GameContext";

const Game = () => {
  const { counts } = useGame();
  const { countGame, countRolled, countRound } = counts;

  return (
    <div>
      <h2>
        Game {countGame} – Round {countRound + 1} (Roll {countRolled + 1})
      </h2>
      <ControllersBox />
      <div className="container-game">
        <DiceRollingContainer />
        <ScoreCard />
      </div>
    </div>
  );
};

export default Game;
