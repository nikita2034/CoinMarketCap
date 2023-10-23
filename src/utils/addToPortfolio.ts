import { Coin } from "../types/coin";

type Portfolio = {
  coin: Coin;
  quantity: number;
};

export function addToPortfolio(coin: Coin, quantity: number) {
  const portfolio = JSON.parse(localStorage.getItem("portfolio") || "[]");

  const existingCoin = portfolio.findIndex(
    (portfolioCoin: Portfolio) => portfolioCoin.coin.id === coin.id
  );
  if (existingCoin !== -1) {
    portfolio[existingCoin].quantity += quantity;
  } else {
    portfolio.push({ coin, quantity });
  }
  localStorage.setItem("portfolio", JSON.stringify(portfolio));
}
