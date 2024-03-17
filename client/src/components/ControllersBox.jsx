import { useGame } from "../contexts/GameContext";

const ControllersBox = () => {
  const {
    rollDice,
    scoringConditionIsSelected,
    gameIsEnded,
    endGameEarly,
    newGame,
  } = useGame();

  return (
    <>
      {gameIsEnded && <button onClick={newGame}>New game</button>}
      {!gameIsEnded && (
        <>
          <button onClick={endGameEarly}>End game (early)</button>
          <div>
            {scoringConditionIsSelected && (
              <button className="btn__roll" onClick={rollDice}>
                Roll dice
              </button>
            )}
            {!scoringConditionIsSelected && (
              <button disabled className="btn__roll">
                Select a scoring condition
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ControllersBox;
