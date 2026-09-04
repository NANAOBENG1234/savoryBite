const LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const ORDER = ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"];

export function statusLabel(s) {
  return LABELS[s] || s;
}

export function statusClass(s) {
  return `badge-${s || "pending"}`;
}

export function orderStatuses() {
  return ORDER;
}
