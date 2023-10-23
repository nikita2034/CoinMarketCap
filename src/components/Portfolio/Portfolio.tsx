import { useState, useEffect } from "react";
import styles from "./Portfolio.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Coin } from "../../types/coin";
import { formatLargeNumbers } from "../../utils/formatLargeNumbers";

type Props={
    close:()=>void
    handleOverlayClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function Portfolio({close,handleOverlayClick}:Props) {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  interface PortfolioItem {
    coin: Coin;
    quantity: number;
  }

  function getPortfolioFromLocalStorage(): PortfolioItem[] {
    const portfolio = JSON.parse(localStorage.getItem("portfolio") || "[]");
    return portfolio;
  }

  function removeCoinFromPortfolio(coinId: string): void {
    const portfolio = JSON.parse(localStorage.getItem("portfolio") || "[]");
    const coinIndex = portfolio.findIndex(
      (item: { coin: Coin; quantity: number }) => item.coin.id === coinId
    );

    if (coinIndex !== -1) {
      portfolio.splice(coinIndex, 1);
      localStorage.setItem("portfolio", JSON.stringify(portfolio));
    }
    const updatedPortfolio = getPortfolioFromLocalStorage();
    setPortfolio(updatedPortfolio);
  }

  useEffect(() => {
    const portfolioData = getPortfolioFromLocalStorage();
    setPortfolio(portfolioData);
  }, []);

  return (
    <div
      className={styles.overlay}
       onClick={(event)=>handleOverlayClick(event)}
    >
      <div className={styles.modal}>
       
       <div className={styles.block_header}>
        <div className={styles.header}>Portfolio</div> <AiOutlineCloseCircle
          className={styles.icon_close}
            onClick={close}
        /></div>
        <ul className={styles.currencylist}>
          {portfolio.map((item) => (
            <li key={item.coin.id} className={styles.currency}>
              <div>
                {item.coin.name} {item.coin.symbol}
              </div>
              <div>{item.quantity} монет</div>
              <div>
                {formatLargeNumbers(item.quantity * Number(item.coin.priceUsd))}
                $
              </div>
              <RiDeleteBin5Fill
                className={styles.icon_delete}
                onClick={() => removeCoinFromPortfolio(item.coin.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Portfolio;
