import React from "react";

import styles from "./DiceBox.module.css";

const DiceBox = () => {
  return (
    <div className={styles["dice-box"]}>
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
