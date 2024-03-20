import { NavLink } from "react-router-dom";

import { useSession } from "../contexts/SessionContext";
import { useAuth } from "../contexts/AuthContext";

import styles from "./Header.module.css";

const Header = ({ scoresIsShowing = false }) => {
  const { currentUser } = useSession();
  const { logout } = useAuth();

  const clickHandler = () => logout();

  return (
    <div className={styles.header}>
      <h1>Yahtzə!</h1>
      {scoresIsShowing && <NavLink to="/play">Back to game</NavLink>}
      {!scoresIsShowing && <NavLink to="/scores">Your scores</NavLink>}
      <div className={styles["user-box"]}>
        {currentUser && (
          <div>
            Hello,{" "}
            <span className={styles.username}>{currentUser.username}</span>!
          </div>
        )}
        <button className="btn btn-secondary" onClick={clickHandler}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Header;
