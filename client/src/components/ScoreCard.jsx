import { useGame } from "../contexts/GameContext";

import ScoringRow from "./ScoringRow";

const ScoreCard = () => {
  const { scoringCells, scoreCriterionCell } = useGame();

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
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
