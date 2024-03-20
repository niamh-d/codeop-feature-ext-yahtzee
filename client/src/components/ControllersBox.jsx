import { useGame } from "../contexts/GameContext";

import styles from "./ControllersBox.module.css";

const ControllersBox = () => {
  const {
    rollDice,
    scoringConditionIsSelected,
    gameIsEnded,
    endGameEarly,
    newGame,
  } = useGame();

  return (
    <div className={styles["controllers-box"]}>
      {gameIsEnded && (
        <button className="btn btn-primary" onClick={newGame}>
          New game
        </button>
      )}
      {!gameIsEnded && (
        <>
          <button className={styles["btn-end-early"]} onClick={endGameEarly}>
            End game (early)
          </button>
          <div>
            {scoringConditionIsSelected && (
              <button className="btn btn-primary" onClick={rollDice}>
                Roll 🎲
              </button>
            )}
            {!scoringConditionIsSelected && (
              <button disabled className="btn btn-secondary">
                Select a scoring condition
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ControllersBox;
