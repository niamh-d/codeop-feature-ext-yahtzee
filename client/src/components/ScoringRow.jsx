import React, { useState } from "react";

const ScoringRow = ({ criterionName, score, handler, isScoreable }) => {
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

  const onClickHandler = (e) => {
    if (!isScoreable || isScored) return;

    if (!score) score = 0;

    handler(criterionName, score);

    setIsScored(true);
  };

  return (
    <tr>
      <td>{criterionTransformString(criterionName)}</td>
      <td
        onClick={onClickHandler}
        className={isScored ? "scored" : isScoreable ? "scoreable" : null}
      >
        {score === 0 ? "0" : score ? score : null}
      </td>
    </tr>
  );
};

export default ScoringRow;
