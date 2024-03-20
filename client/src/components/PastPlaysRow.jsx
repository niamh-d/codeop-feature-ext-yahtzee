const PastPlaysRow = ({ play }) => {
  const playDetails = {
    date: play.date_played,
    gameNum: play.game_number,
    totalScore: play.total_score_game,
    yahtzeeCount: play.yahtee_score_count,
    totalUpper: play.total_upper_wo_bonus,
    totalLower: play.lower_wo_bonus,
    rounds: play.rounds_played,
    complete: play.full_game === 1,
  };

  const {
    date,
    gameNum,
    totalScore,
    yahtzeeCount,
    totalUpper,
    totalLower,
    rounds,
    complete,
  } = playDetails;

  return (
    <tr>
      <td>{date}</td>
      <td>{totalScore}</td>
      <td>{totalUpper}</td>
      <td>TBD</td>
      <td>{yahtzeeCount}</td>
      <td>{totalLower}</td>
      <td>{rounds}</td>
      <td>{complete}</td>
    </tr>
  );
};

export default PastPlaysRow;
