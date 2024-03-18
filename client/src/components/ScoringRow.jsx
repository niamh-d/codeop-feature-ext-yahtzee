import React, { useState, useEffect } from "react";

const ScoringRow = ({
  conditionName,
  score,
  handler,
  isScoreable,
  countGame,
}) => {
  if (conditionName === "yahtzee") return;

  const [isScored, setIsScored] = useState(false);

  useEffect(() => {
    if (!isScored) return;
    setIsScored(false);
  }, [countGame]);

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

    handler(conditionName);

    setIsScored(true);
  };

  return (
    <tr>
      <td>{conditionTransformString(conditionName)}</td>

      <td
        onClick={onClickHandler}
        className={isScored ? "scored" : isScoreable ? "scoreable" : null}
      >
        {score === 0 && isScored ? "0" : score ? score : null}
      </td>
    </tr>
  );
};

export default ScoringRow;
