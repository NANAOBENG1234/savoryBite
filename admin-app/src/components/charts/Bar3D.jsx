import React from "react";
import { maxOf, niceMax, colorAt, shade, polygonPath, shortLabel } from "./chartUtils";

const W = 640;
const H = 340;
const PAD_LEFT = 6;
const PAD_RIGHT = 42;
const PAD_TOP = 26;
const BASE_LABEL = 26;
const DEPTH = { dx: 16, dy: -14 };
const SLOT_GAP = 20;
const GRID_LINES = 4;

function Bar3D({ data = [], maxValue, formatValue = (v) => String(v) }) {
  const items = data.slice(0, 12);
  const m = maxValue || niceMax(maxOf(items, "value"));
  const baseY = H - BASE_LABEL;
  const chartTop = PAD_TOP;

  const n = Math.max(items.length, 1);
  const slot = (W - PAD_LEFT - PAD_RIGHT - DEPTH.dx) / n;
  const w = Math.max(8, slot - SLOT_GAP);
  const rightEdge = PAD_LEFT + slot * items.length;

  const ground = `${PAD_LEFT},${baseY} ${rightEdge},${baseY} ${rightEdge + DEPTH.dx},${baseY + DEPTH.dy} ${PAD_LEFT + DEPTH.dx},${baseY + DEPTH.dy}`;

  const levels = [];
  for (let i = 0; i <= GRID_LINES; i++) {
    levels.push({ frac: i / GRID_LINES, value: Math.round((m * i) / GRID_LINES) });
  }

  return (
    <svg className="chart-3d" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="3D bar chart">
      {levels.map((lv) => {
        const y = baseY - (lv.frac * (baseY - chartTop));
        return (
          <g key={lv.value}>
            <line x1={PAD_LEFT} y1={y} x2={rightEdge} y2={y} stroke="rgba(26,37,68,0.14)" strokeDasharray={lv.value === 0 ? "0" : "3 4"} />
            {lv.value > 0 && (
              <text x={PAD_LEFT - 6} y={y + 4} textAnchor="end" className="chart-axis-label" fill="rgba(26,37,68,0.55)">{formatValue(lv.value)}</text>
            )}
          </g>
        );
      })}

      <polygon points={ground} fill="rgba(26,37,68,0.05)" stroke="rgba(26,37,68,0.2)" strokeDasharray="2 3" />
      <line x1={PAD_LEFT} y1={baseY} x2={rightEdge} y2={baseY} stroke="rgba(26,37,68,0.35)" strokeWidth={1.5} />
      <line x1={PAD_LEFT} y1={baseY} x2={PAD_LEFT + DEPTH.dx} y2={baseY + DEPTH.dy} stroke="rgba(26,37,68,0.25)" strokeWidth={1.5} />

      {items.map((d, i) => {
        const x = PAD_LEFT + slot * i;
        const v = Number(d.value) || 0;
        const h = Math.max(v > 0 ? 3 : 0, (v / m) * (baseY - chartTop));
        const color = d.color || colorAt(i);
        const front = `${x},${baseY} ${x + w},${baseY} ${x + w},${baseY - h} ${x},${baseY - h}`;
        const top = `${x},${baseY - h} ${x + w},${baseY - h} ${x + w + DEPTH.dx},${baseY - h + DEPTH.dy} ${x + DEPTH.dx},${baseY - h + DEPTH.dy}`;
        const side = `${x + w},${baseY} ${x + w + DEPTH.dx},${baseY + DEPTH.dy} ${x + w + DEPTH.dx},${baseY - h + DEPTH.dy} ${x + w},${baseY - h}`;
        return (
          <g key={d.label} className="chart-bar3d">
            {h > 0 && (
              <>
                <polygon points={side} fill={shade(color, 0.7)} />
                <polygon points={front} fill={color} />
                <polygon points={top} fill={shade(color, 1.3)} />
              </>
            )}
            <text x={x + w / 2} y={baseY + 15} textAnchor="middle" className="chart-bar-label" fill="rgba(26,37,68,0.7)">
              {shortLabel(d.label, 7)}
            </text>
            {h > 0 && (
              <text x={x + w / 2 + DEPTH.dx * 0.5} y={baseY - h + DEPTH.dy - 6} textAnchor="middle" className="chart-value-label" fill={shade(color, 0.85)}>
                {formatValue(v)}
              </text>
            )}
            <title>{`${d.label}: ${formatValue(v)}`}</title>
          </g>
        );
      })}
    </svg>
  );
}

export default Bar3D;