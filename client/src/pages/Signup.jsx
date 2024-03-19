import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import styles from "./Signup.module.css";

const Signup = () => {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { signup } = useAuth();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const userDetails = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      username: usernameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    if (signup(userDetails)) navigate("/login");
  };

  return (
    <main>
      <section className={styles.signup}>
        <div className={styles["signup-heading-box"]}>
          <h2 className={styles["signup-heading"]}>Sign up</h2>
          <button
            className="btn btn-primary"
            type="button"
            onClick={submitHandler}
          >
            Sign up
          </button>
        </div>
        <form onSubmit={submitHandler}>
          <label htmlFor="firstname">First name</label>
          <input id="firstname" type="text" ref={firstNameInputRef} />
          <label htmlFor="lastname">Last name</label>
          <input id="lastname" type="text" ref={lastNameInputRef} />
          <label htmlFor="username">Username</label>
          <input id="username" type="username" ref={usernameInputRef} />
          <label htmlFor="email">Email</label>
          <input id="email" type="email" ref={emailInputRef} />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" ref={passwordInputRef} />
        </form>
      </section>
    </main>
  );
};

export default Signup;
