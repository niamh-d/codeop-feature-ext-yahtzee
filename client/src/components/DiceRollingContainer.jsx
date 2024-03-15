import DiceRollBox from "./DiceRollBox";
import HeldDiceBox from "./HeldDiceBox";

import styles from "./DiceRollingContainer.module.css";

const DiceRollingContainer = () => {
  return (
    <div className={styles.container}>
      <h2>Your roll</h2>
      <DiceRollBox />
      <h2>Held dice</h2>
      <HeldDiceBox />
    </div>
  );
};

export default DiceRollingContainer;
