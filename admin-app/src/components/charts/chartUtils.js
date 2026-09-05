export const CHART_COLORS = [
  "#e8693a",
  "#c8950e",
  "#2d8f5e",
  "#4c5899",
  "#e0b02e",
  "#a84322",
  "#3aa76f",
  "#d76f5c",
  "#7c311a",
  "#232e5e",
];

export function colorAt(i) {
  return CHART_COLORS[i % CHART_COLORS.length];
}

export function withAlpha(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function shade(hex, factor) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, Math.round(((n >> 16) & 255) * factor)));
  const g = Math.min(255, Math.max(0, Math.round(((n >> 8) & 255) * factor)));
  const b = Math.min(255, Math.max(0, Math.round((n & 255) * factor)));
  return `rgb(${r},${g},${b})`;
}

export function ellipsePoint(cx, cy, rx, ry, angleDeg) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + rx * Math.cos(a), y: cy - ry * Math.sin(a) };
}

export function polygonPath(points) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";
}

export function arcPath(cx, cy, rx, ry, startDeg, endDeg, reverse = false) {
  const start = ellipsePoint(cx, cy, rx, ry, startDeg);
  const end = ellipsePoint(cx, cy, rx, ry, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  const sweep = reverse ? 0 : 1;
  return `M ${start.x},${start.y} A ${rx} ${ry} 0 ${large} ${sweep} ${end.x},${end.y}`;
}

export function maxOf(arr, key) {
  return arr.reduce((m, d) => Math.max(m, Number(d[key]) || 0), 0);
}

export function niceMax(value) {
  if (!value) return 10;
  const pow = Math.pow(10, Math.floor(Math.log10(value)));
  return Math.ceil(value / (pow * 2)) * pow * 2;
}

export function shortLabel(label, len = 8) {
  const s = String(label || "");
  return s.length > len ? `${s.slice(0, len - 1)}…` : s;
}