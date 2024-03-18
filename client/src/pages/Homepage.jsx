import { Link } from "react-router-dom";

import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main>
      <section className={styles.homepage}>
        <div className={styles.homepage__content}>
          <div className={styles["heading-box"]}>
            <h1 className={styles.heading}>
              yahtzǝ!<sup>&#8482;</sup>
            </h1>
            <p className={styles["tag-line"]}>
              Your favorite Yahtzee dice roller.
            </p>
          </div>
          <div>
            <h2 className={styles["cta-text"]}>Gǝt rolling!</h2>
            <div className={styles["button-box"]}>
              <button className="btn btn-primary">
                <Link to="/signup">Create your free account</Link>
              </button>
              <button className="btn btn-secondary">
                <Link to="/login">Log in</Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
