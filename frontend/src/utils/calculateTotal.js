export function calculateTotal(items) {
  return items.reduce((sum, item) => {
    const addonsTotal = (item.selectedAddons || []).reduce((s, a) => s + a.price, 0);
    return sum + (item.price + addonsTotal) * item.quantity;
  }, 0);
}
