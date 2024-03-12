import { useGame } from "../contexts/GameContext";

const ScoreCard = () => {
  const { scoringCells } = useGame();

  const { aces, twos, threes, fours, fives, sixes } = scoringCells;

  return (
    <div>
      <h2>ScoreCard</h2>
      <table>
        <tr>
          <th>Condition</th>
          <th>Score</th>
        </tr>
        <tr>
          <td>Aces</td>
          <td>{aces ? aces : ""}</td>
        </tr>
        <tr>
          <td>Twos</td>
          <td>{twos ? twos : ""}</td>
        </tr>
        <tr>
          <td>Threes</td>
          <td>{threes ? threes : ""}</td>
        </tr>
        <tr>
          <td>Fours</td>
          <td>{fours ? fours : ""}</td>
        </tr>
        <tr>
          <td>Fives</td>
          <td>{fives ? fives : ""}</td>
        </tr>
        <tr>
          <td>Sixes</td>
          <td>{sixes ? sixes : ""}</td>
        </tr>
      </table>
    </div>
  );
};

export default ScoreCard;
