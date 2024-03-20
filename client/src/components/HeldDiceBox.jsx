import { useGame } from "../contexts/GameContext";

import Die from "./Die";

import styles from "./HeldDiceBox.module.css";

const HeldDiceBox = () => {
  const { heldDice, returnDie } = useGame();

  return (
    <div className={styles["dice-row"]}>
      {heldDice.map((num, i) => (
        <Die
          key={i}
          num={num}
          id={i}
          held={true}
          handler={returnDie}
          rollAnimation={false}
        />
      ))}
    </div>
  );
};

export default HeldDiceBox;
