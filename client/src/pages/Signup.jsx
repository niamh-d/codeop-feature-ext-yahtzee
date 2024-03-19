import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import styles from "./Signup.module.css";

const Signup = () => {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { signup } = useAuth();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const userDetails = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
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
          <label htmlFor="First name">First name</label>
          <input type="text" ref={firstNameInputRef} />
          <label htmlFor="Last name">Last name</label>
          <input type="text" ref={lastNameInputRef} />
          <label htmlFor="Email">Email</label>
          <input type="email" ref={emailInputRef} />
          <label htmlFor="Password">Password</label>
          <input type="password" ref={passwordInputRef} />
        </form>
      </section>
    </main>
  );
};

export default Signup;
