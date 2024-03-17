import { useGame } from "../contexts/GameContext";

import ScoringRow from "./ScoringRow";
import YahtzeeScoringRow from "./YahtzeeScoringRow";

const ScoreCard = () => {
  const {
    displayedScoringCells,
    scoreConditionCell,
    scoredTotalsAndBonuses,
    yahtzeeScoreCount,
    isScoreable,
    yahtzeeIsClickable,
    countGame,
  } = useGame();

  const {
    upperTotalScored,
    upperBonusScored,
    grandTotalUpperScored,
    yahtzeeBonusScored,
    lowerTotalScored,
    grandTotalGameScored,
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
          {Object.keys(displayedScoringCells.upper).map((condition) => (
            <ScoringRow
              key={condition}
              conditionName={condition}
              score={displayedScoringCells.upper[condition]}
              handler={scoreConditionCell}
              isScoreable={isScoreable}
              countGame={countGame}
            />
          ))}
          <tr>
            <td>Total</td>
            <td>{upperTotalScored ? upperTotalScored : ""}</td>
          </tr>
          <tr>
            <td>Bonus</td>
            <td>{upperBonusScored ? upperBonusScored : ""}</td>
          </tr>
          <tr>
            <td>Upper Total</td>
            <td>{grandTotalUpperScored ? grandTotalUpperScored : ""}</td>
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
          {Object.keys(displayedScoringCells.lower).map((condition) => (
            <ScoringRow
              key={condition}
              conditionName={condition}
              score={displayedScoringCells.lower[condition]}
              handler={scoreConditionCell}
              isScoreable={isScoreable}
              countGame={countGame}
            />
          ))}
          <YahtzeeScoringRow
            score={displayedScoringCells.lower.yahtzee}
            handler={scoreConditionCell}
            yahtzeeScoreCount={yahtzeeScoreCount}
            yahtzeeIsClickable={yahtzeeIsClickable}
          />
          <tr>
            <td>Yahtzee bonus</td>
            <td>{yahtzeeBonusScored ? yahtzeeBonusScored : ""}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{lowerTotalScored ? lowerTotalScored : ""}</td>
          </tr>
          <tr>
            <td>Game Grand Total</td>
            <td>{grandTotalGameScored ? grandTotalGameScored : ""}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
