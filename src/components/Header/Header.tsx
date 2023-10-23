import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { BsBriefcaseFill } from "react-icons/bs";
import { fetchData } from "../../api/fetchData";
import { Coin } from "../../types/coin";
import { formatLargeNumbers } from "../../utils/formatLargeNumbers";
import { calculatePortfolioValue } from "../../utils/calculatePortfolioValue";
import Portfolio from "../Portfolio/Portfolio";

function Header() {
  const [popularCurrencies, setPopularCurrencies] = useState<Coin[]>([]);
  const [portfolioValue, setPortfolioValue] = useState<string>("Loading...");
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData(1, 3);
        setPopularCurrencies(result);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchDataFromApi();
    calculatePortfolioValue().then((value) => setPortfolioValue(value));
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <img alt="logo" className={styles.logo} src="\img/wallet.png" />
        <div className={styles.title}>CoinMarketCap</div>
      </div>

      <div className={styles.popular_cryptocurrencies}>
        {popularCurrencies?.map((crypto) => (
          <div className={styles.popular_cryptocurrency} key={crypto.id}>
            <span className={styles.popular_cryptocurrency_title}>
              {crypto.name}
            </span>
            <span className={styles.popular_cryptocurrency_price}>
              {formatLargeNumbers(Number(crypto.priceUsd))} USD
            </span>
          </div>
        ))}
      </div>

      <div className={styles.briefcase} onClick={openModal}>
        <div className={styles.price}>{portfolioValue}</div>
        <BsBriefcaseFill className={styles.icon_briefcase} />
      </div>
      {modalOpen && (
        <Portfolio close={closeModal} handleOverlayClick={handleOverlayClick} />
      )}
    </div>
  );
}
export default Header;
