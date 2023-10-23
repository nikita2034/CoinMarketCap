import { Coin } from "../types/coin";
type Props = {
  a: Coin;
  b: Coin;
  sortDirection: "asc" | "desc";
};
export function sortByMarketCap({ a, b, sortDirection }: Props): number {
  const marketCapA = parseFloat(a.marketCapUsd);
  const marketCapB = parseFloat(b.marketCapUsd);
  return sortDirection === "asc"
    ? marketCapA - marketCapB
    : marketCapB - marketCapA;
}
