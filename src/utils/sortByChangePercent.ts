import { Coin } from "../types/coin";
type Props = {
  a: Coin;
  b: Coin;
  sortDirection: "asc" | "desc";
};
export function sortByChangePercent({ a, b, sortDirection }: Props): number {
  const changePercentA = parseFloat(a.changePercent24Hr);
  const changePercentB = parseFloat(b.changePercent24Hr);
  return sortDirection === "asc"
    ? changePercentA - changePercentB
    : changePercentB - changePercentA;
}
