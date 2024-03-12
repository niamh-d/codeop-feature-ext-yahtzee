import { useGame } from "../contexts/GameContext";

import ScoringRow from "./ScoringRow";

const ScoreCard = () => {
  const { scoringCells, scoreCriterionCell } = useGame();

  return (
    <div>
      <h2>ScoreCard</h2>
      <table>
        <thead>
          <tr>
            <th>Condition</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(scoringCells).map((criterion) => (
            <ScoringRow
              key={criterion}
              criterionName={criterion}
              score={scoringCells[criterion]}
              handler={scoreCriterionCell}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
