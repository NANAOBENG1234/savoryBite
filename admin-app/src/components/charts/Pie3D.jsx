import React from "react";
import { colorAt, ellipsePoint, shade, polygonPath, withAlpha } from "./chartUtils";

const RX = 130;
const RY = 54;
const CX = 150;
const CY = 150;
const THICK = 42;
const STEP = 3;
const GAP = 1.4;

function normZero(val) {
  let v = val % 360;
  if (v < 0) v += 360;
  return v;
}

function sampleRaw(start, end, step) {
  const pts = [];
  const dir = start > end ? -1 : 1;
  let a = start;
  const bound = dir === -1 ? end : end;
  while (dir === -1 ? a >= bound : a <= bound) {
    pts.push(a);
    a += dir * step;
  }
  return pts;
}

function Pie3D({ data = [], formatValue = (v) => String(v) }) {
  const items = data.filter((d) => (Number(d.value) || 0) > 0);
  const total = items.reduce((s, d) => s + Number(d.value), 0);

  if (!total) {
    return <div className="chart-empty">No data to display</div>;
  }

  const slices = [];
  let cursor = -90;
  items.forEach((d, i) => {
    const sweep = (360 * Number(d.value)) / total;
    const color = d.color || colorAt(i);
    const start = cursor - GAP / 2;
    const end = cursor - sweep + GAP / 2;
    slices.push({ d, color, start, end, sweep, mid: (start + end) / 2 });
    cursor -= sweep;
  });

  const hasFront = (s) => sampleRaw(s.start, s.end, STEP).some((a) => CY - RY * Math.sin((a * Math.PI) / 180) >= CY);
  slices.forEach((s) => {
    s.front = hasFront(s);
  });

  const topSector = (s) => {
    const pts = sampleRaw(s.start, s.end, STEP).map((a) => ellipsePoint(CX, CY, RX, RY, a));
    return polygonPath([{ x: CX, y: CY }, ...pts]);
  };

  const wallPath = (s) => {
    const run = [];
    const bands = [];
    for (const a of sampleRaw(s.start, s.end, STEP)) {
      const p = { ...ellipsePoint(CX, CY, RX, RY, a), a };
      if (p.y >= CY) run.push(p);
      else if (run.length) {
        bands.push(run);
        run.length = 0;
      }
    }
    if (run.length) bands.push(run);
    return bands
      .map((band) => {
        const top = band.map((p) => ({ x: p.x, y: p.y }));
        const bottom = band.map((p) => ({ x: p.x, y: p.y + THICK })).reverse();
        return polygonPath([...top, ...bottom]);
      })
      .join(" ");
  };

  const percent = (v) => Math.round((v / total) * 100);

  return (
    <div className="chart-pie-flex">
      <svg className="chart-3d" viewBox="0 0 300 220" role="img" aria-label="3D pie chart">
        <ellipse cx={CX} cy={CY + THICK} rx={RX} ry={RY} fill="rgba(26,37,68,0.045)" stroke="rgba(26,37,68,0.18)" />
        {slices.filter((s) => !s.front).map((s) => (
          <path key={s.d.label} d={topSector(s)} fill={s.color} stroke={shade(s.color, 1.12)} strokeWidth={0.8} />
        ))}
        {slices.filter((s) => s.front).map((s) => (
          <g key={s.d.label}>
            <path d={wallPath(s)} fill={shade(s.color, 0.6)} />
            <path d={topSector(s)} fill={s.color} stroke={shade(s.color, 1.12)} strokeWidth={0.8} />
            <text x={ellipsePoint(CX, CY, RX * 0.55, RY * 0.55, s.mid).x} y={ellipsePoint(CX, CY, RX * 0.55, RY * 0.55, s.mid).y + 4} textAnchor="middle" className="chart-slice-label" fill="#fff">
              {percent(s.d.value)}%
            </text>
            <title>{`${s.d.label}: ${formatValue(s.d.value)} (${percent(s.d.value)}%)`}</title>
          </g>
        ))}
      </svg>
      <ul className="chart-legend">
        {slices.map((s) => (
          <li key={s.d.label} className="chart-legend-item">
            <span className="chart-legend-swatch" style={{ background: s.color }} />
            <span className="chart-legend-name">{s.d.label}</span>
            <span className="chart-legend-value">{formatValue(s.d.value)}</span>
            <span className="chart-legend-pct">{percent(s.d.value)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pie3D;