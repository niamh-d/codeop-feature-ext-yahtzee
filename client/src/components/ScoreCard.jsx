import { useGame } from "../contexts/GameContext";

import ScoringRow from "./ScoringRow";
import YahtzeeScoringRow from "./YahtzeeScoringRow";

const ScoreCard = () => {
  const {
    scoringCells,
    scoreConditionCell,
    scoredTotalsAndBonuses,
    yahtzeeIsScored,
    isScoreable,
    yahtzeeIsClickable,
  } = useGame();

  const {
    upperTotal,
    upperBonus,
    grandTotalUpper,
    yahtzeeBonusStars,
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
          {Object.keys(scoringCells.upper).map((condition) => (
            <ScoringRow
              key={condition}
              conditionName={condition}
              score={scoringCells.upper[condition]}
              handler={scoreConditionCell}
              isScoreable={isScoreable}
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
          {Object.keys(scoringCells.lower).map((condition) => (
            <ScoringRow
              key={condition}
              conditionName={condition}
              score={scoringCells.lower[condition]}
              handler={scoreConditionCell}
              isScoreable={isScoreable}
            />
          ))}
          <YahtzeeScoringRow
            score={scoringCells.lower.yahtzee}
            handler={scoreConditionCell}
            isScoreable={isScoreable}
            yahtzeeIsScored={yahtzeeIsScored}
            yahtzeeIsClickable={yahtzeeIsClickable}
          />
          <tr>
            <td>Yahtzee bonus</td>
            <td>{yahtzeeBonusStars ? yahtzeeBonusStars : ""}</td>
          </tr>
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
