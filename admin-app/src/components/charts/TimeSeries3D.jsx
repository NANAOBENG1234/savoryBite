import React from "react";
import { maxOf, niceMax, shade, polygonPath, withAlpha } from "./chartUtils";

const W = 680;
const H = 300;
const PAD_LEFT = 40;
const PAD_RIGHT = 40;
const PAD_TOP = 22;
const BASE_LABEL = 26;
const DEPTH = { dx: -18, dy: -12 };
const COLOR = "#2d8f5e";

function TimeSeries3D({ data = [], maxValue, formatValue = (v) => String(v) }) {
  const items = data || [];
  const m = maxValue || niceMax(maxOf(items, "value"));
  const baseY = H - BASE_LABEL;
  const chartTop = PAD_TOP;
  const n = Math.max(items.length, 1);
  const slot = (W - PAD_LEFT - PAD_RIGHT) / n;
  const w = Math.max(4, slot * 0.4);

  const midPoints = items.map((d, i) => {
    const x = PAD_LEFT + slot * i;
    const v = Number(d.value) || 0;
    const h = Math.max(v > 0 ? 2 : 0, (v / m) * (baseY - chartTop));
    return { x, cx: x + w / 2, h, v, d };
  });

  const labelsEvery = items.length > 8 ? 2 : 1;
  const ribbonFront = midPoints.map((p) => ({ x: p.cx, y: baseY - p.h }));
  const ribbonBack = midPoints.map((p) => ({ x: p.cx + DEPTH.dx, y: baseY - p.h + DEPTH.dy })).reverse();

  return (
    <svg className="chart-3d" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="3D time series chart">
      <polygon
        points={`${PAD_LEFT},${baseY} ${W - PAD_RIGHT},${baseY} ${W - PAD_RIGHT + DEPTH.dx},${baseY + DEPTH.dy} ${PAD_LEFT + DEPTH.dx},${baseY + DEPTH.dy}`}
        fill="rgba(26,37,68,0.05)"
        stroke="rgba(26,37,68,0.18)"
        strokeDasharray="2 3"
      />
      <line x1={PAD_LEFT} y1={baseY} x2={W - PAD_RIGHT} y2={baseY} stroke="rgba(26,37,68,0.3)" strokeWidth={1.5} />

      {midPoints.map((p, i) => (
        <g key={p.d?.day || i} className="chart-bar3d">
          {p.h > 0 && (
            <>
              <polygon points={`${p.x + w},${baseY} ${p.x + w + DEPTH.dx},${baseY + DEPTH.dy} ${p.x + w + DEPTH.dx},${baseY - p.h + DEPTH.dy} ${p.x + w},${baseY - p.h}`} fill={shade(COLOR, 0.62)} />
              <polygon points={`${p.x},${baseY} ${p.x + w},${baseY} ${p.x + w},${baseY - p.h} ${p.x},${baseY - p.h}`} fill={shade(COLOR, p.h / (baseY - chartTop) + 0.35)} />
              <polygon points={`${p.x},${baseY - p.h} ${p.x + w},${baseY - p.h} ${p.x + w + DEPTH.dx},${baseY - p.h + DEPTH.dy} ${p.x + DEPTH.dx},${baseY - p.h + DEPTH.dy}`} fill={shade(COLOR, 1.45)} />
            </>
          )}
          {i % labelsEvery === 0 && p.d?.day && (
            <text x={p.cx} y={baseY + 14} textAnchor="middle" className="chart-bar-label" fill="rgba(26,37,68,0.55)">
              {String(p.d.day).slice(5)}
            </text>
          )}
          <title>{`${p.d?.day || ""}: ${formatValue(p.v)}`}</title>
        </g>
      ))}

      {items.length > 0 && (
        <>
          <path d={polygonPath([...ribbonFront, ...ribbonBack])} fill={withAlpha(COLOR, 0.14)} />
          <polyline points={ribbonFront.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke={COLOR} strokeWidth={2.4} strokeLinejoin="round" />
          {midPoints.map((p, i) => (
            <circle key={i} cx={p.cx} cy={baseY - p.h} r={3.4} fill={COLOR} stroke="#fff" strokeWidth={1.4} />
          ))}
        </>
      )}
    </svg>
  );
}

export default TimeSeries3D;