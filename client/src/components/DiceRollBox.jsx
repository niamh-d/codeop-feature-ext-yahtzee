import Die from "./Die";
import { useGame } from "../contexts/GameContext";

import styles from "./DiceRollBox.module.css";

const DiceBox = () => {
  const { rolledDice, holdDie } = useGame();

  return (
    <div className={styles["dice-row"]}>
      {rolledDice.map((num, i) => (
        <Die key={i} num={num} id={i} handler={holdDie} />
      ))}
    </div>
  );
};

export default DiceBox;
