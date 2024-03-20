import { useEffect, useState } from "react";

import styles from "./Die.module.css";

const diceStyles = {
  1: { transform: "rotateX(0deg) rotateY(0deg)" },
  2: { transform: "rotateX(0deg) rotateY(0deg)" },
  3: { transform: "rotateX(0deg) rotateY(90deg)" },
  4: { transform: "rotateX(0deg) rotateY(-90deg)" },
  5: { transform: "rotateX(90deg) rotateY(0deg)" },
  6: { transform: "rotateX(180deg) rotateY(0deg)" },
};

const Die = ({ num, id, handler, rollAnimation = true, held=false }) => {

  const initialDiceStyle = {};

  if(held) initialDiceStyle.transform = diceStyles[num].transform;

  const [diceStyle, setDiceStyle] = useState(initialDiceStyle);

  useEffect(() => {
    if (!rollAnimation) {
      setDiceStyle({ animation: "none", transform: diceStyles[num].transform });
      return;
    }

    setDiceStyle({ animation: "rolling 3s" });

    setTimeout(() => {
      setDiceStyle({ animation: "none", transform: diceStyles[num].transform });
    }, 1050);
  }, [rollAnimation]);

  return (
    <div className={styles.die} style={diceStyle} onClick={() => handler(id)}>
      <div className={`${styles.face} ${styles.front}`}></div>
      <div className={`${styles.face} ${styles.back}`}></div>
      <div className={`${styles.face} ${styles.top}`}></div>
      <div className={`${styles.face} ${styles.bottom}`}></div>
      <div className={`${styles.face} ${styles.right}`}></div>
      <div className={`${styles.face} ${styles.left}`}></div>
    </div>
  );
};

export default Die;
