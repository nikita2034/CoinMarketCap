import { formatLargeNumbers } from "./formatLargeNumbers";
import { fetchCoinDataById } from "../api/fetchData";

export async function calculatePortfolioValue(): Promise<string> {
  const portfolio = JSON.parse(localStorage.getItem("portfolio") || "[]");
  let totalValue = 0;
  let initialValue = 0;
  let percentageDifference = 0;

  for (const portfolioItem of portfolio) {
    const coin = portfolioItem.coin;
    const quantity = portfolioItem.quantity;
    const coinValue = coin.priceUsd * quantity;
    initialValue += coinValue;
    const currentPriceData = await fetchCoinDataById(coin.id);

    if (currentPriceData && currentPriceData.priceUsd) {
      const currentPrice = currentPriceData.priceUsd;
      const coinValue = currentPrice * quantity;
      totalValue += coinValue;
    }
  }
  const difference = totalValue - initialValue;

  if (difference !== 0) {
    percentageDifference = Number(((difference / totalValue) * 100).toFixed(2));
  }
  const result = `${formatLargeNumbers(initialValue)} USD (${
    difference > 0 ? "+" : ""
  } ${percentageDifference}%)`;

  return result;
}
