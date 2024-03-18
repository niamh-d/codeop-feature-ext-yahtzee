import DiceRollingContainer from "./DiceRollingContainer";
import ScoreCard from "./ScoreCard";
import ControllersBox from "./ControllersBox";
import CountsBox from "./CountsBox";

const Game = () => {
  return (
    <div>
      <CountsBox />
      <ControllersBox />
      <div className="container-game">
        <DiceRollingContainer />
        <ScoreCard />
      </div>
    </div>
  );
};

export default Game;
