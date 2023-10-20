import React, { useState } from "react";
import { Coin } from "../../types/coin";
import { formatLargeNumbers } from "../../utils/formatLargeNumbers";
import styles from "./BuyCoinModal.module.scss";
interface Props {
  isOpen: boolean;
  closeModal: () => void;
  coinData?: Coin;
  maxQuantity: number;
  minQuantity: number;
}

function BuyCoinModal({
  isOpen,
  closeModal,
  coinData,
  maxQuantity,
  minQuantity,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (
      !isNaN(newQuantity) &&
      newQuantity >= minQuantity &&
      newQuantity <= maxQuantity
    ) {
      setQuantity(newQuantity);
    }
  };

  const handleBuy = () => {
    // addToPortfolio(coinData, quantity);
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        Buy {coinData?.name} ({coinData?.symbol})
      </div>
      <div className={styles.price}>
        Price: {formatLargeNumbers(Number(coinData?.priceUsd))}$
      </div>
      <div className={styles.price}>
        Total cost:{" "}
        {Number(quantity) *
          Number(formatLargeNumbers(Number(coinData?.priceUsd)))}
      </div>
      <label className={styles.price}>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={handleChangeQuantity}
          min={minQuantity}
          max={maxQuantity}
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
  );
}

export default BuyCoinModal;
