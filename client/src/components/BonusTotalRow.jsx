const BonusTotalRow = ({ title, value }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{value ? value : ""}</td>
    </tr>
  );
};

export default BonusTotalRow;
