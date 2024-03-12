import React from "react";

import styles from "./DiceRollBox.module.css";

const DiceBox = () => {
  return (
    <div className={styles["dice-row"]}>
      <div>
        <span>die 1</span>
      </div>
      <div>
        <span>die 2</span>
      </div>
      <div>
        <span>die 3</span>
      </div>
      <div>
        <span>die 4</span>
      </div>
      <div>
        <span>die 5</span>
      </div>
    </div>
  );
};

export default DiceBox;
