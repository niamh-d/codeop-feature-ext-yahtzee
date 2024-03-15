import React, { useState } from "react";

const ScoringRow = ({
  criterionName,
  score,
  handler,
  isScoreable,
  yahtzeeIsScored,
}) => {
  const [isScored, setIsScored] = useState(false);

  const criterionTransformString = (criterionName) => {
    switch (criterionName) {
      case "threeKind":
        return "Three of a Kind";
      case "fourKind":
        return "Four of a Kind";
      case "fullHouse":
        return "Full House";
      case "smallStraight":
        return "Small Straight";
      case "largeStraight":
        return "Large Straight";
      case "yahtzee":
        return "Yahtzee";
      case "chance":
        return "Chance";
      default:
        return criterionName[0].toUpperCase() + criterionName.slice(1);
    }
  };

  const onClickHandler = () => {
    if (!isScoreable || isScored) return;

    if (!score) score = 0;

    handler(criterionName, score);

    setIsScored(true);
  };

  const onClickHandlerYahtzee = () => {
    if (!isScoreable) return;
    if (score === 0) return;

    handler(criterionName, score);
  };

  return (
    <tr>
      <td>{criterionTransformString(criterionName)}</td>
      {criterionName !== "yahtzee" && (
        <td
          onClick={onClickHandler}
          className={isScored ? "scored" : isScoreable ? "scoreable" : null}
        >
          {score === 0 && criterionName !== "chance"
            ? "0"
            : score
            ? score
            : null}
        </td>
      )}
      {criterionName === "yahtzee" && (
        <td
          onClick={onClickHandlerYahtzee}
          className={
            yahtzeeIsScored && isScoreable
              ? "pointer scored"
              : isScoreable
              ? "scoreable"
              : null
          }
        >
          {score === 0 ? "0" : score ? score : null}
        </td>
      )}
    </tr>
  );
};

export default ScoringRow;
