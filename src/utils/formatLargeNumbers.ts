export function formatLargeNumbers(price: number): string {
  if (price >= 1_000_000_000) {
    return (price / 1_000_000_000).toFixed(2) + "b";
  } else if (price >= 1_000_000) {
    return (price / 1_000_000).toFixed(2) + "m";
  } else if (price >= 1_000) {
    return (price / 1_000).toFixed(2) + "k";
  } else {
    return price.toFixed(2);
  }
}
