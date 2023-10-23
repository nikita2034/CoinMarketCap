import { Coin } from "../types/coin";

type Props = {
  a: Coin;
  b: Coin;
  sortDirection: "asc" | "desc";
};
export function sortByPrice({ a, b, sortDirection }: Props): number {
  const priceA = parseFloat(a.priceUsd);
  const priceB = parseFloat(b.priceUsd);
  return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
}
