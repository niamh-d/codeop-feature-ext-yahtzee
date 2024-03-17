import React, { useState } from "react";

const ScoringRow = ({ conditionName, score, handler, isScoreable }) => {
  if (conditionName === "yahtzee") return;

  const [isScored, setIsScored] = useState(false);

  const conditionTransformString = (conditionName) => {
    switch (conditionName) {
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
      case "chance":
        return "Chance";
      default:
        return conditionName[0].toUpperCase() + conditionName.slice(1);
    }
  };

  const onClickHandler = () => {
    if (!isScoreable || isScored) return;

    if (!score) score = 0;

    handler(conditionName, score);

    setIsScored(true);
  };

  return (
    <tr>
      <td>{criterionTransformString(conditionName)}</td>

      <td
        onClick={onClickHandler}
        className={isScored ? "scored" : isScoreable ? "scoreable" : null}
      >
        {score === 0 && conditionName !== "chance" ? "0" : score ? score : null}
      </td>
    </tr>
  );
};

export default ScoringRow;
