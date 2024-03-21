import Die from "./Die";

import styles from "./HeldDiceBox.module.css";

const HeldDiceBox = ({ dice, returnHandler, randKey }) => {
  return (
    <div className={styles["dice-row"]}>
      {dice.map((num, i) => (
        <Die
          key={`*${num}*${randKey()}`}
          num={num}
          id={i}
          handler={returnHandler}
          rollAnimation={false}
        />
      ))}
    </div>
  );
};

export default HeldDiceBox;
