import React, { useState } from "react";
import { Coin } from "../../types/coin";
import { formatLargeNumbers } from "../../utils/formatLargeNumbers";
import { generateRandomString } from "../../utils/generateRandomString";
import { addToPortfolio } from "../../utils/addToPortfolio";
import styles from "./BuyCoinModal.module.scss";
import { useMyContext } from "../../context/Context";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
interface Props {
  isOpen: boolean;
  closeModal: () => void;
  coinData?: Coin;
  maxQuantity: number;
  minQuantity: number;
  handleOverlayClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function BuyCoinModal({ closeModal, coinData, handleOverlayClick }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { setValue } = useMyContext();

  const handleBuy = () => {
    if (coinData) {
      addToPortfolio(coinData, quantity);
      const randomString = generateRandomString(10);
      const timestamp = new Date().getTime();
      setValue(`${randomString}-${timestamp}`);
    }
    closeModal();
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={(event) => handleOverlayClick(event)}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          Buy {coinData?.name} ({coinData?.symbol})
        </div>
        <div className={styles.price}>
          Price: {formatLargeNumbers(Number(coinData?.priceUsd))}$
        </div>
        <div className={styles.price}>
          Total cost:{" "}
          {formatLargeNumbers(quantity * Number(coinData?.priceUsd))}$
        </div>
        <label className={styles.quantity}>
          Quantity:
          <AiOutlineMinusSquare
            onClick={handleDecreaseQuantity}
            className={styles.icon_quantity}
          />
          <div className={styles.title_quantity}>{quantity}</div>
          <AiOutlinePlusSquare
            onClick={handleIncreaseQuantity}
            className={styles.icon_quantity}
          />
        </label>
        <div className={styles.block_button}>
          <button className={styles.button} onClick={handleBuy}>
            Buy
          </button>
          <button className={styles.button} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyCoinModal;
