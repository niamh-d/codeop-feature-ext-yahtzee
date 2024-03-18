const YahtzeeScoringRow = ({
  score,
  handler,
  yahtzeeScoreCount,
  yahtzeeIsClickable,
}) => {
  const yahtzeeIsScored = yahtzeeScoreCount > 0;

  const onClickHandler = () => {
    if (!yahtzeeIsClickable) return;
    if (score === 0) return;

    handler("yahtzee");
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
        {score === 0 && yahtzeeIsScored ? "0" : score ? score : null}
      </td>
    </tr>
  );
};

export default YahtzeeScoringRow;
