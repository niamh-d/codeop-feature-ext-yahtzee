const PastPlaysRow = ({ play }) => {
  const {
    date,
    gameNum,
    totalScore,
    yahtzeeCount,
    upperBonus,
    totalUpper,
    totalLower,
    rounds,
    complete,
  } = play;

  function dataCleaner(date) {
    const d = new Date(date.slice(0, 4), date.slice(5, 7), date.slice(8, 10));
    return d.toLocaleString("en-US", { dateStyle: "long" });
  }

  return (
    <tr>
      <td>{dataCleaner(date)}</td>
      <td>{gameNum}</td>
      <td>{totalScore}</td>
      <td>{totalUpper}</td>
      <td>{upperBonus ? "✅" : "Not scored"}</td>
      <td>{yahtzeeCount ? "⭐️".repeat(yahtzeeCount) : "None"}</td>
      <td>{totalLower}</td>
      <td>{rounds}</td>
      <td>{complete ? "Complete game" : "Ended early"}</td>
    </tr>
  );
};

export default PastPlaysRow;
