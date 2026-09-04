export function formatPrice(value) {
  const n = Number(value || 0);
  return `₦${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
