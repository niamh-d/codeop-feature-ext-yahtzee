import { useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login, checkAuthentication, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/play", { replace: true });

    checkAuthentication();
  }, [isAuthenticated]);

  const [useEmail, setUseEmail] = useState(true);

  const emailOrUsernameInputRef = useRef();
  const passwordInputRef = useRef();

  const inputType = useEmail ? "email" : "text";

  const loginHandler = () => {
    let email;
    let username;
    if (useEmail) {
      email = emailOrUsernameInputRef.current.value;
      username = null;
    } else {
      username = emailOrUsernameInputRef.current.value;
      email = null;
    }

    const userCredentials = {
      email,
      username,
      password: passwordInputRef.current.value,
    };

    login(userCredentials);

    navigate("/play");
  };

  const switchInputHandler = () => setUseEmail((prev) => !prev);

  const activeLabel = useEmail ? "Email" : "Username";
  const altLabel = useEmail ? "(click for username)" : "(click for email)";

  return (
    <main>
      <section className={styles.login}>
        <div className={styles["login-heading-box"]}>
          <h2 className={styles["login-heading"]}>Login</h2>
          <button
            className="btn btn-primary"
            type="button"
            onClick={loginHandler}
          >
            Login
          </button>
        </div>
        <form>
          <label htmlFor="email" onClick={switchInputHandler}>
            {activeLabel}{" "}
            <span className={styles["nonactive-label"]}>{altLabel}</span>
          </label>
          <input type={inputType} ref={emailOrUsernameInputRef} />
          <label htmlFor="password">Password</label>
          <input type="password" ref={passwordInputRef} />
        </form>
      </section>
    </main>
  );
};

export default Login;
