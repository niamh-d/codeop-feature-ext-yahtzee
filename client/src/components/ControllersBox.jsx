import { useGame } from "../contexts/GameContext";

const ControllersBox = () => {
  const { rollDice, criterionIsSelected, gameIsEnded, endGameEarly, newGame } =
    useGame();

  return (
    <>
      {gameIsEnded && <button onClick={newGame}>New game</button>}
      {!gameIsEnded && (
        <>
          <button onClick={endGameEarly}>End game (early)</button>
          <div>
            {criterionIsSelected && (
              <button className="btn__roll" onClick={rollDice}>
                Roll dice
              </button>
            )}
            {!criterionIsSelected && (
              <button disabled className="btn__roll">
                Select a scoring criterion
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ControllersBox;
