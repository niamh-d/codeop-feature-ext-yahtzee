import Die from "./Die";

import styles from "./HeldDiceBox.module.css";

const HeldDiceBox = ({ dice, returnHandler }) => {
  return (
    <div className={styles["dice-row"]}>
      {dice.map((num, i) => (
        <Die
          key={i}
          num={num}
          id={i}
          held={true}
          handler={returnHandler}
          rollAnimation={false}
        />
      ))}
    </div>
  );
};

export default HeldDiceBox;
