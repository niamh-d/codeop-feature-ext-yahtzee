import Header from "../components/Header";
import PastPlaysTable from "../components/PastPlaysTable";

const PastPlays = () => {
  return (
    <>
      <Header scoresIsShowing={true} />
      <main className="main">
        <section>
          <h1>PastPlays</h1>
          <PastPlaysTable />
        </section>
      </main>
    </>
  );
};

export default PastPlays;
