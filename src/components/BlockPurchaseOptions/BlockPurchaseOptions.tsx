import { useState } from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import styles from "./BlockPurchaseOptions.module.scss";
import { formatLargeNumbers } from "../../utils/formatLargeNumbers";
import { Coin } from "../../types/coin";
import { addToPortfolio } from "../../utils/addToPortfolio";
import { generateRandomString } from "../../utils/generateRandomString";
import { useMyContext } from "../../context/Context";

type Props = {
  coinDetails: Coin;
};
function BlockPurchaseOptions({ coinDetails }: Props) {
  const { setValue } = useMyContext();
  const [quantity, setQuantity] = useState<number>(1);
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

  function addCoinInPortfolio() {
    addToPortfolio(coinDetails, quantity);
    const randomString = generateRandomString(10);
    const timestamp = new Date().getTime();
    setValue(`${randomString}-${timestamp}`);
  }

  return (
    <div className={styles.portfolio_add_menu}>
      <div className={styles.portfolio_add_menu_header}>Add to portfolio</div>
      <div className={styles.portfolio_add_menu_block}>
        <div className={styles.portfolio_add_menu_title}>
          {coinDetails.name}({coinDetails.symbol}):
        </div>
        <div className={styles.portfolio_add_menu_title}>
          {formatLargeNumbers(Number(coinDetails.priceUsd))}$
        </div>
      </div>
      <div className={styles.portfolio_add_menu_block}>
        <div className={styles.portfolio_add_menu_block}>
          <AiOutlineMinusSquare
            onClick={handleDecreaseQuantity}
            className={styles.portfolio_add_menu_icon_quantity}
          />
          <div className={styles.portfolio_add_menu_coin_quantity}>
            {quantity}
          </div>
          <AiOutlinePlusSquare
            onClick={handleIncreaseQuantity}
            className={styles.portfolio_add_menu_icon_quantity}
          />
        </div>
        <div className={styles.portfolio_add_menu_title}>
          <div>Total cost:</div>
          <div>
            {formatLargeNumbers(quantity * Number(coinDetails.priceUsd))}$
          </div>
        </div>
      </div>
      <button
        className={styles.portfolio_add_menu_button}
        onClick={() => addCoinInPortfolio()}
      >
        add
      </button>
    </div>
  );
}
export default BlockPurchaseOptions;
