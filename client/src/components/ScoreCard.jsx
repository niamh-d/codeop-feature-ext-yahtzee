import { useGame } from "../contexts/GameContext";

import ScoringRow from "./ScoringRow";

const ScoreCard = () => {
  const { scoringCells, scoreCriterionCell, scoredTotalsAndBonuses } =
    useGame();

  const {
    upperTotal,
    upperBonus,
    grandTotalUpper,
    lowerTotal,
    grandTotalGame,
  } = scoredTotalsAndBonuses;

  return (
    <div>
      <h2>ScoreCard</h2>
      <h3>Upper</h3>
      <table>
        <thead>
          <tr>
            <th>Condition</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(scoringCells.upper).map((criterion) => (
            <ScoringRow
              key={criterion}
              criterionName={criterion}
              score={scoringCells.upper[criterion]}
              handler={scoreCriterionCell}
            />
          ))}
          <tr>
            <td>Total</td>
            <td>{upperTotal ? upperTotal : ""}</td>
          </tr>
          <tr>
            <td>Bonus</td>
            <td>{upperBonus ? upperBonus : ""}</td>
          </tr>
          <tr>
            <td>Upper Total</td>
            <td>{grandTotalUpper ? grandTotalUpper : ""}</td>
          </tr>
        </tbody>
      </table>
      <h3>Lower</h3>
      <table>
        <thead>
          <tr>
            <th>Condition</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(scoringCells.lower).map((criterion) => (
            <ScoringRow
              key={criterion}
              criterionName={criterion}
              score={scoringCells.lower[criterion]}
              handler={scoreCriterionCell}
            />
          ))}
          <tr>
            <td>Total</td>
            <td>{lowerTotal ? lowerTotal : ""}</td>
          </tr>
          <tr>
            <td>Game Grand Total</td>
            <td>{grandTotalGame ? grandTotalGame : ""}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
