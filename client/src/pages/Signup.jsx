import { Link } from "react-router-dom";

import styles from "./Signup.module.css";

const Signup = () => {
  return (
    <main>
      <section className={styles.signup}>
        <div className={styles["signup-heading-box"]}>
          <h2 className={styles["signup-heading"]}>Sign up</h2>
          <button className="btn btn-primary">Sign up</button>
        </div>
        <form>
          <label htmlFor="First name">First name</label>
          <input type="text" />
          <label htmlFor="Last name">Last name</label>
          <input type="text" />
          <label htmlFor="Email">Email</label>
          <input type="email" />
          <label htmlFor="Password">Password</label>
          <input type="password" />
        </form>
      </section>
    </main>
  );
};

export default Signup;
