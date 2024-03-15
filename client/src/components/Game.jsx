import DiceRollingContainer from "./DiceRollingContainer";
import ScoreCard from "./ScoreCard";

import { useGame } from "../contexts/GameContext";

const Game = () => {
  const { rollDice, criterionIsSelected, gameIsEnded, endGameEarly } =
    useGame();

  return (
    <div>
      {!gameIsEnded && (
        <>
          <button onClick={endGameEarly}>End game (early)</button>
          <div>
            {criterionIsSelected && (
              <button className="btn__roll" onClick={rollDice}>
                Roll dice
              </button>
            )}
            {!criterionIsSelected && (
              <button disabled className="btn__roll">
                Select a scoring criterion
              </button>
            )}
          </div>
        </>
      )}
      <div className="container-game">
        <DiceRollingContainer />
        <ScoreCard />
      </div>
    </div>
  );
};

export default Game;
