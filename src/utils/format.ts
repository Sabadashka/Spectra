export const formatPrice = (n: number): string =>
  "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
