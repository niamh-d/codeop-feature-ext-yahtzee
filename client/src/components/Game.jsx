import DiceRollingContainer from "./DiceRollingContainer";
import ScoreCard from "./ScoreCard";
import ControllersBox from "./ControllersBox";
import CountsBox from "./CountsBox";

const Game = () => {
  return (
    <main className="main">
      <CountsBox />
      <ControllersBox />
      <div className="container-game">
        <DiceRollingContainer />
        <ScoreCard />
      </div>
    </main>
  );
};

export default Game;
