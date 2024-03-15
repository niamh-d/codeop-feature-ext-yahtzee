import React from "react";

const ScoringRow = ({ criterionName, score, handler }) => {
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

  return (
    <tr>
      <td>{criterionTransformString(criterionName)}</td>
      <td onClick={() => handler(criterionName, score)}>
        {score ? score : ""}
      </td>
    </tr>
  );
};

export default ScoringRow;
