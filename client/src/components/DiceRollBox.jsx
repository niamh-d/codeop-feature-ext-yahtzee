import Dice from "./Dice";
import { useGame } from "../contexts/GameContext";

import styles from "./DiceRollBox.module.css";

const DiceBox = () => {
  const { rolledDice } = useGame();

  return (
    <div className={styles["dice-row"]}>
      {rolledDice.map((num, i) => (
        <Dice key={i} num={num} />
      ))}
    </div>
  );
};

export default DiceBox;
