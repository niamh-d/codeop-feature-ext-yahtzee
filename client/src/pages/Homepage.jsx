import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./Homepage.module.css";

import { useAuth } from "../contexts/AuthContext";

export default function Homepage() {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/play", { replace: true });
  }, [isAuthenticated]);

  const loginHandler = () => navigate("/login");
  const signupHandler = () => navigate("/signup");

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
            <h2 className={styles["cta-text"]}>Gǝt rolling now!</h2>
            <div className={styles["button-box"]}>
              <button className="btn btn-primary" onClick={signupHandler}>
                Create your free account
              </button>
              <button className="btn btn-secondary" onClick={loginHandler}>
                Log in
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
