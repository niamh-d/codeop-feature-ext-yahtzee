import DiceRollBox from "./DiceRollBox";
import HeldDiceBox from "./HeldDiceBox";

import styles from "./DiceRollingContainer.module.css";

import { useGame } from "../contexts/GameContext";

const DiceRollingContainer = () => {
  const { dice, returnDie, holdDie, randKey } = useGame();
  const { heldDice, rolledDice } = dice;
  return (
    <div className={styles.container}>
      <h2>Your roll</h2>
      <DiceRollBox dice={rolledDice} holdHandler={holdDie} randKey={randKey} />
      <h2>Held dice</h2>
      <HeldDiceBox
        dice={heldDice}
        returnHandler={returnDie}
        randKey={randKey}
      />
    </div>
  );
};

export default DiceRollingContainer;
