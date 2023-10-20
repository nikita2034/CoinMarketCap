import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { BsBriefcaseFill } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { fetchData } from "../../api/fetchData";
import { Coin } from "../../types/coin";
import { formatLargeNumbers } from "../../utils/formatLargeNumbers";
function Header() {
  const [popularCurrencies, setPopularCurrencies] = useState<Coin[]>([]);
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData(1, 3);
        setPopularCurrencies(result);
        console.log(result);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchDataFromApi();
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
        <img alt="logo" className={styles.logo} src="./img/wallet.png" />
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
        <div className={styles.price}>12312312$</div>
        <BsBriefcaseFill className={styles.icon_briefcase} />
      </div>
      {modalOpen && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.modal}>
            <AiOutlineCloseCircle
              className={styles.icon_close}
              onClick={closeModal}
            />
            <div className={styles.modal_header}>Portfolio</div>
            <ul className={styles.currencylist}>
              <li className={styles.currency}>
                <div className={styles.currency_name}>name</div>
                <div className={styles.currency_price}>price</div>
                <RiDeleteBin5Fill className={styles.icon_delete} />
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default Header;
