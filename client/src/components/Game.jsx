import DiceRollingContainer from "./DiceRollingContainer";
import ScoreCard from "./ScoreCard";

const Game = () => {
  return (
    <div className="container-game">
      <DiceRollingContainer />
      <ScoreCard />
    </div>
  );
};

export default Game;
