export function priceToNumber(price) {
  return Number(String(price).replace(/[^\d]/g, "")) || 0;
}

export function formatPrice(value) {
  return `PKR ${value.toLocaleString("en-US")}`;
}
