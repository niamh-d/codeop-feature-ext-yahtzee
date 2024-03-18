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
    countGame,
  } = useGame();

  const {
    upperTotalScored,
    upperBonusScored,
    grandTotalUpperScored,
    lowerTotalScored,
    grandTotalGameScored,
  } = scoredTotalsAndBonuses;

  const { yahtzeeIsClickable, yahtzeeScoreCount } = yahtzee;

  const yahtzeeBonusStars = "*".repeat(
    (yahtzeeScoreCount <= 0 ? 1 : yahtzeeScoreCount) - 1
  );

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
          <BonusTotalRow title={"Total"} value={upperTotalScored} />
          <BonusTotalRow title={"Bonus"} value={upperBonusScored} />
          <BonusTotalRow title={"Upper Total"} value={grandTotalUpperScored} />
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
          <BonusTotalRow title={"Yahtzee bonus"} value={yahtzeeBonusStars} />
          <BonusTotalRow title={"Total"} value={lowerTotalScored} />
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
