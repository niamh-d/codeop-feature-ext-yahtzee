import { useGame } from "../contexts/GameContext";

import ScoringRow from "./ScoringRow";
import YahtzeeScoringRow from "./YahtzeeScoringRow";
import BonusTotalRow from "./BonusTotalRow";

const ScoreCard = () => {
  const {
    displayedScoringCells,
    scoreConditionCell,
    scoredTotalsAndBonuses,
    isScoreable,
    yahtzee,
    counts,
  } = useGame();

  const {
    upperTotalScored,
    upperBonusScored,
    grandTotalUpperScored,
    lowerTotalScored,
    grandLowerTotalScored,
    grandTotalGameScored,
  } = scoredTotalsAndBonuses;

  const { countGame } = counts;
  const { yahtzeeIsClickable, yahtzeeScoreCount } = yahtzee;

  const yahtzeeBonusStars = "⭐️".repeat(
    (yahtzeeScoreCount <= 0 ? 1 : yahtzeeScoreCount) - 1
  );

  return (
    <div>
      <h2>ScoreCard</h2>
      <h3>Upper</h3>
      <table className="scorecard-table">
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
          <BonusTotalRow title={"Upper Total"} value={upperTotalScored} />
          <BonusTotalRow title={"Upper Bonus"} value={upperBonusScored} />
          <BonusTotalRow
            title={"Upper Grand Total"}
            value={grandTotalUpperScored}
          />
        </tbody>
      </table>
      <h3>Lower</h3>
      <table className="scorecard-table">
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
          <BonusTotalRow title={"Lower Total"} value={lowerTotalScored} />
          <BonusTotalRow title={"Yahtzee bonus"} value={yahtzeeBonusStars} />
          <BonusTotalRow
            title={"Lower Grand Total"}
            value={grandLowerTotalScored}
          />
          <BonusTotalRow
            title={"Game Grand Total"}
            value={grandTotalGameScored}
          />
        </tbody>
      </table>
    </div>
  );
};

export default ScoreCard;
