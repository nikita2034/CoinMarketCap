export function addToPortfolio(coinId: string, quantity: number) {
  const portfolio = JSON.parse(localStorage.getItem("portfolio") || "[]");

  const existingCoin = portfolio.find((coin: any) => coin.coinId === coinId);

  if (existingCoin) {
    existingCoin.quantity += quantity;
  } else {
    portfolio.push({ coinId, quantity });
  }

  localStorage.setItem("portfolio", JSON.stringify(portfolio));
}
