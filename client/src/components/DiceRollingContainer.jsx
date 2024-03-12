import DiceRollBox from "./DiceRollBox";
import KeptDiceBox from "./KeptDiceBox";

import { useGame } from "../contexts/GameContext";

const DiceRollingContainer = () => {
  const { rollDice } = useGame();

  return (
    <div>
      <button className="btn__roll" onClick={rollDice}>
        Roll dice
      </button>
      <h2>Your roll</h2>
      <DiceRollBox />
      <KeptDiceBox />
    </div>
  );
};

export default DiceRollingContainer;
