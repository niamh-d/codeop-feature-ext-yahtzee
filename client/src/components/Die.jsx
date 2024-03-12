import styles from "./Die.module.css";

const Die = ({ num, id, handler }) => {
  return (
    <div className={styles.die}>
      <span className={styles.die__number} onClick={() => handler(id)}>
        {num}
      </span>
    </div>
  );
};

export default Die;
