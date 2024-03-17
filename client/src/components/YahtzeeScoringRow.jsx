import React, { useState } from "react";

const ScoringRow = ({
  conditionName,
  score,
  handler,
  isScoreable,
  yahtzeeIsScored,
  yahtzeeIsClickable,
}) => {
  const [isScored, setIsScored] = useState(false);

  const onClickHandler = () => {
    if (!yahtzeeIsClickable) return;
    if (score === 0) return;

    handler(conditionName, score);
  };

  return (
    <tr>
      <td>Yahtzee</td>
      <td
        onClick={onClickHandler}
        className={
          yahtzeeIsScored && !yahtzeeIsClickable
            ? "scored"
            : !yahtzeeIsScored && yahtzeeIsClickable
            ? "pointer"
            : yahtzeeIsScored && yahtzeeIsClickable
            ? "pointer scored"
            : !yahtzeeIsScored && yahtzeeIsClickable
            ? "scoreable"
            : null
        }
      >
        {score === 0 ? "0" : score ? score : null}
      </td>
    </tr>
  );
};

export default ScoringRow;
