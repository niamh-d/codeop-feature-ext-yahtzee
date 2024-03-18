import { Link } from "react-router-dom";

import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main>
      <section className={styles.homepage}>
        <div className={styles.homepage__content}>
          <h1>yahtzee</h1>
          <p>Get rolling!</p>
          <div>
            <button>
              <Link to="/signup">Sign up</Link>
            </button>

            <button>
              <Link to="/login">Log in</Link>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
