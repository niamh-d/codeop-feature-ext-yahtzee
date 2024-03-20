import { useSession } from "../contexts/SessionContext";

import PastPlaysRow from "./PastPlaysRow";

const PastPlaysTable = () => {
  const { pastPlays } = useSession();

  return (
    <>
      {pastPlays.length > 0 && (
        <table className="table-plays">
          <thead>
            <tr>
              <th>Date Played</th>
              <th>Game Number</th>
              <th>Total Score</th>
              <th>Upper Total</th>
              <th>Upper Bonus Scored</th>
              <th>Number of Yahtzees</th>
              <th>Lower Total</th>
              <th>Rounds Played</th>
              <th>Complete Game</th>
            </tr>
          </thead>
          <tbody>
            {pastPlays.map((play) => (
              <PastPlaysRow play={play} key={play.id} />
            ))}
          </tbody>
        </table>
      )}
      {pastPlays.length === 0 && <p>You do not have any past plays saved.</p>}
    </>
  );
};

export default PastPlaysTable;
