import { max, scaleBand, scaleLinear } from "d3";
import type { DataItem } from "./data";

// space around the chart area: the top is left free for the grid-line values
const MARGIN = { top: 40, right: 20, bottom: 20, left: 20 };

// bar labels: font size, and the gap between a label and the bar's start or end
const LABEL_FONT_SIZE = 14;
const LABEL_PADDING = 7;

// estimated width of a label, not measured: about 0.6 × font size per character
const textWidth = (name: string) => name.length * LABEL_FONT_SIZE * 0.6;

type BarplotProps = {
  width: number;
  height: number;
  data: DataItem[];
};

export const Barplot = ({ width, height, data }: BarplotProps) => {
  // the "bounds" are the area inside the margins, where the bars are drawn
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // largest count first, so it gets the top band; copy with [...] because .sort() mutates in place
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  // y: one band per disease, in sorted order (first name → top band)
  const groups = sortedData.map((d) => d.name);
  const yScale = scaleBand()
    .domain(groups)
    .range([0, boundsHeight])
    .padding(0.3);

  // x: bar length, from 0 so a bar's length is proportional to its count
  // d3.max returns undefined for an empty array, hence the ?? 0 fallback
  const maxCount = max(sortedData, (d) => d.count) ?? 0;
  const xScale = scaleLinear()
    .domain([0, maxCount])
    .range([0, boundsWidth]);

  // labels go inside from the top bar down, until the first bar too short for its name;
  // from that bar on, every label goes outside (bars are sorted, so the rest are shorter still)
  const firstMisfit = sortedData.findIndex(
    (d) => xScale(d.count) <= textWidth(d.name) + 2 * LABEL_PADDING
  );
  // findIndex returns -1 when every name fits: then all labels are inside
  const insideCount = firstMisfit === -1 ? sortedData.length : firstMisfit;

  // one <rect> per disease: starts at x = 0, length from xScale, position and thickness from yScale
  // yScale() returns undefined for a name not in its domain, hence the ?? 0 fallback
  const bars = sortedData.map((d) => (
    <rect
      key={d.name}
      x={0}
      y={yScale(d.name) ?? 0}
      width={xScale(d.count)}
      height={yScale.bandwidth()}
      fill="#076fa2"
    />
  ));

  // one label per bar: inside in white, or just past the end in blue
  const labels = sortedData.map((d, i) => {
    const barLength = xScale(d.count);
    const inside = i < insideCount;

    return (
      <text
        key={d.name}
        x={inside ? LABEL_PADDING : barLength + LABEL_PADDING}
        y={(yScale(d.name) ?? 0) + yScale.bandwidth() / 2} // vertical middle of the band
        dominantBaseline="central" // center the text on that y, instead of sitting on it
        fontSize={LABEL_FONT_SIZE}
        fill={inside ? "white" : "#076fa2"}
      >
        {d.name}
      </text>
    );
  });

  // vertical grid lines at round values, each with its value printed above the chart
  // xScale.ticks(5) asks d3 for about 5 "nice" values inside the domain: here 0, 10, 20, ..., 50
  const grid = xScale.ticks(5).map((value) => (
    <g key={value}>
      <line
        x1={xScale(value)}
        x2={xScale(value)}
        y1={0}
        y2={boundsHeight}
        stroke={value === 0 ? "black" : "#d0d0d0"} // the 0 line is the baseline the bars grow from
        strokeWidth={value === 0 ? 2 : 1}
      />
      <text
        x={xScale(value)}
        y={-10} // above the bounds, inside the top margin
        textAnchor="middle" // center the number on its line
        fontSize={12}
        fill="#666"
      >
        {value}
      </text>
    </g>
  ));

  return (
    <svg width={width} height={height}>
      {/* shift everything into the bounds, so (0, 0) is the top-left corner inside the margins */}
      <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
        {/* drawn first so the bars and labels sit on top of the lines (SVG has no z-index) */}
        {grid}
        {bars}
        {labels}
      </g>
    </svg>
  );
};
