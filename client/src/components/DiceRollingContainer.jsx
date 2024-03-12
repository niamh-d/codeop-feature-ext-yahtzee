import DiceRollBox from "./DiceRollBox";
import KeptDiceBox from "./KeptDiceBox";

const DiceRollingContainer = () => {
  return (
    <div>
      <button className="btn__roll">Roll dice</button>
      <h2>Your roll</h2>
      <DiceRollBox />
      <KeptDiceBox />
    </div>
  );
};

export default DiceRollingContainer;
