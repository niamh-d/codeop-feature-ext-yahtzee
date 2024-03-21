import Die from "./Die";
import { useGame } from "../contexts/GameContext";

import styles from "./DiceRollBox.module.css";

const DiceRollBox = ({ dice, holdHandler }) => {
  const { isFreshRoll } = useGame();

  return (
    <div className={styles["dice-row"]}>
      {dice.map((num, i) => (
        <Die
          key={i}
          num={num}
          id={i}
          handler={holdHandler}
          freshRoll={isFreshRoll}
        />
      ))}
    </div>
  );
};

export default DiceRollBox;
