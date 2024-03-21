import Die from "./Die";
import { useGame } from "../contexts/GameContext";

import styles from "./DiceRollBox.module.css";

const DiceRollBox = () => {
  const { holdDie, dice } = useGame();
  const { rolledDice, diceToScore } = dice;

  return (
    <div className={styles["dice-row"]}>
      {rolledDice.map((num, i) => (
        <Die key={i} num={num} id={i} handler={holdDie} dice={diceToScore} />
      ))}
    </div>
  );
};

export default DiceRollBox;
