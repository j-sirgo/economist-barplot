import { Barplot } from "./Barplot";
import { data } from "./data";

// width shared by the chart and the text around it, so they line up
const WIDTH = 600;

function App() {
  return (
    <figure className="chart" style={{ width: WIDTH }}>
      {/* the short red bar above the title is The Economist's signature */}
      <div className="chart-flag" />
      <h1 className="chart-title">Escape artists</h1>
      <p className="chart-subtitle">
        Number of laboratory-acquired infections, 1970–2021
      </p>

      <Barplot width={WIDTH} height={500} data={data} />

      <figcaption className="chart-footer">
        <p>
          Sources: Laboratory-Acquired Infection Database; American Biological
          Safety Association
        </p>
        <p className="chart-brand">The Economist</p>
      </figcaption>
    </figure>
  );
}

export default App;
