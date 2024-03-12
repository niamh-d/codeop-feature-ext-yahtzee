import DiceRollBox from "./DiceRollBox";
import HeldDiceBox from "./HeldDiceBox";

import { useGame } from "../contexts/GameContext";

import styles from "./DiceRollingContainer.module.css";

const DiceRollingContainer = () => {
  const { rollDice } = useGame();

  return (
    <div>
      <button className="btn__roll" onClick={rollDice}>
        Roll dice
      </button>
      <div className={styles.container}>
        <h2>Your roll</h2>
        <DiceRollBox />
        <HeldDiceBox />
      </div>
    </div>
  );
};

export default DiceRollingContainer;
