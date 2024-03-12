import React from "react";

const ScoringRow = ({ criterionName, score, handler }) => {
  return (
    <tr>
      <td>{criterionName}</td>
      <td onClick={() => handler(criterionName, score)}>
        {score ? score : ""}
      </td>
    </tr>
  );
};

export default ScoringRow;
