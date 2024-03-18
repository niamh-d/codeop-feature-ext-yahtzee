import styles from "./Login.module.css";

const Login = () => {
  return (
    <main>
      <section className={styles.login}>
        <div className={styles["login-heading-box"]}>
          <h2 className={styles["login-heading"]}>Login</h2>
          <button className="btn btn-primary">Login</button>
        </div>
        <form>
          <label htmlFor="Email">Email</label>
          <input type="email" />
          <label htmlFor="Password">Password</label>
          <input type="password" />
        </form>
      </section>
    </main>
  );
};

export default Login;
