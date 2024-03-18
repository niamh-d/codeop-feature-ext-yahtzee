import { useGame } from "../contexts/GameContext";

const CountsBox = () => {
  const { counts } = useGame();
  const { countGame, countRolled, countRound } = counts;

  return (
    <div>
      <h2>
        Game {countGame} – Round {countRound} (Roll{" "}
        {!countRolled ? 1 : countRolled})
      </h2>
    </div>
  );
};

export default CountsBox;
