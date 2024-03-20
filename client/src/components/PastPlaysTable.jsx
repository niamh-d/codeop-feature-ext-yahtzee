import { useSession } from "../contexts/SessionContext";

import PastPlaysRow from "./PastPlaysRow";

const PastPlaysTable = () => {
  const { pastPlays } = useSession();

  return (
    <div>
      <table>
        <tr>
          <th>Date Played</th>
          <th>Total Score</th>
          <th>Upper Total</th>
          <th>Upper Bonus Scored</th>
          <th>Number of Yahtzees</th>
          <th>Lower Total</th>
          <th>Rounds Played</th>
          <th>Complete Game</th>
        </tr>
        {pastPlays.map((play) => (
          <PastPlaysRow play={play} />
        ))}
      </table>
    </div>
  );
};

export default PastPlaysTable;
