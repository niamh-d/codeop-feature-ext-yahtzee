import Die from "./Die";

import styles from "./HeldDiceBox.module.css";

const HeldDiceBox = ({ dice, returnHandler, randKey }) => {
  return (
    <div className={styles["dice-row"]}>
      {dice.map((num, i) => (
        <Die
          key={`${randKey()}_${num}`}
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
