import DiceRollBox from "./DiceRollBox";
import HeldDiceBox from "./HeldDiceBox";

import { useGame } from "../contexts/GameContext";

import styles from "./DiceRollingContainer.module.css";

const DiceRollingContainer = () => {
  const { rollDice, criterionIsSelected } = useGame();

  return (
    <div>
      {criterionIsSelected && (
        <button className="btn__roll" onClick={rollDice}>
          Roll dice
        </button>
      )}
      {!criterionIsSelected && (
        <button disabled className="btn__roll">
          Select a scoring criteria
        </button>
      )}

      <div className={styles.container}>
        <h2>Your roll</h2>
        <DiceRollBox />
        <h2>Held dice</h2>
        <HeldDiceBox />
      </div>
    </div>
  );
};

export default DiceRollingContainer;
