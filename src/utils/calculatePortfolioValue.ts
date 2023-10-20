export function calculatePortfolioValue(apiData: any) {
  const portfolio = JSON.parse(localStorage.getItem("portfolio") || "[]");

  let portfolioValue = 0;
  let portfolioDifference = 0;

  portfolio.forEach((item: any) => {
    const coin = apiData.find((coinData: any) => coinData.id === item.coinId);

    if (coin) {
      const coinPrice = coin.priceUsd;
      const quantity = item.quantity;
      const currentCoinValue = coinPrice * quantity;
      portfolioValue += currentCoinValue;

      const initialCoinValue = coinPrice * quantity;
      portfolioDifference += currentCoinValue - initialCoinValue;
    }
  });

  return { portfolioValue, portfolioDifference };
}
