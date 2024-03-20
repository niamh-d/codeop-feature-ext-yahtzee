import styles from "./Die.module.css";

const diceStylesStrs = {
  1: { transform: "rotateX(0deg) rotateY(0deg)" },
  2: { transform: "rotateX(0deg) rotateY(0deg)" },
  3: { transform: "rotateX(0deg) rotateY(90deg)" },
  4: { transform: "rotateX(0deg) rotateY(-90deg)" },
  5: { transform: "rotateX(90deg) rotateY(0deg)" },
  6: { transform: "rotateX(180deg) rotateY(0deg)" },
};

const Die = ({ num, id, handler }) => {
  return (
    <div
      className={styles.die}
      style={diceStylesStrs[num]}
      onClick={() => handler(id)}
    >
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
