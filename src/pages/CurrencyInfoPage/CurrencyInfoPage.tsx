import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCoinDataById } from "../../api/fetchData";
import Header from "../../components/Header/Header";
import styles from "./CurrencyInfoPage.module.scss";
import PriceChart from "../../components/PriceChart/PriceChart";
import { GiRank1 } from "react-icons/gi";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { Coin } from "../../types/coin";
import { formatLargeNumbers } from "../../utils/formatLargeNumbers";
import { addToPortfolio } from "../../utils/addToPortfolio";
type Interval = "d1" | "w1" | "m1";

function CurrencyInfoPage() {
  const { id } = useParams();
  const [coinDetails, setCoinDetails] = useState<Coin | null>();
  const [quantity, setQuantity] = useState<number>(1);
  const [period, setPeriod] = useState<Interval>("d1");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchCoinDataById(String(id));
        setCoinDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при получении данных монеты:", error);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!coinDetails) {
  //   return <div>Монета не найдена</div>;
  // }

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
    <>
      {coinDetails && (
        <>
          <Header />
          <div className={styles.container}>
            <Link to="/" className={styles.button_back}>
              Вернуться назад
            </Link>

            <div className={styles.header}>
              <div className={styles.trade_mark}>
                <div className={styles.block_rank}>
                  <GiRank1 className={styles.icon_rank} />
                  <div className={styles.rank_value}>{coinDetails.rank}</div>
                  <div className={styles.rank_title}>rank</div>
                </div>

                <div className={styles.name_coin}>
                  {coinDetails.name} ({coinDetails.symbol})
                </div>
              </div>

              <div className={styles.coin_info}>
                <div className={styles.block}>
                  <div className={styles.block_title}>Supply</div>
                  <div className={styles.block_value}>
                    {formatLargeNumbers(Number(coinDetails.supply))}
                  </div>
                </div>

                <div className={styles.block}>
                  <div className={styles.block_title}>Max Supply</div>
                  <div className={styles.block_value}>
                    {formatLargeNumbers(Number(coinDetails.maxSupply))}
                  </div>
                </div>

                <div className={styles.block}>
                  <div className={styles.block_title}>Price</div>
                  <div className={styles.block_value}>
                    {formatLargeNumbers(Number(coinDetails.priceUsd))}
                  </div>
                </div>

                <div className={styles.block}>
                  <div className={styles.block_title}>Market Cap</div>
                  <div className={styles.block_value}>
                    {formatLargeNumbers(Number(coinDetails.marketCapUsd))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.block_main}>
              <div className={styles.chart}>
              <div className={styles.chart_options}>
                  <div className={styles.chart_options_title}>График изменения за:</div>
                  <button className={styles.chart_options_button} onClick={() => setPeriod("d1")}>день</button>
                  <button className={styles.chart_options_button} onClick={() => setPeriod("w1")}>7 дней</button>
                  <button className={styles.chart_options_button} onClick={() => setPeriod("m1")}>месяц</button>
                </div>
                <PriceChart assetId={String(id)} period={period} />
               
              </div>

              <div className={styles.portfolio_add_menu}>
                <div className={styles.portfolio_add_menu_header}>
                  Add to portfolio
                </div>
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
                    < AiOutlinePlusSquare
                      onClick={handleIncreaseQuantity}
                      className={styles.portfolio_add_menu_icon_quantity}
                    />
                  </div>
                  <div className={styles.portfolio_add_menu_title}>
                    <div>Total cost:</div>
                    <div>
                      {formatLargeNumbers(
                        quantity * Number(coinDetails.priceUsd)
                      )}
                      $
                    </div>
                  </div>
                </div>
                <button className={styles.portfolio_add_menu_button} onClick={()=>addToPortfolio(coinDetails,quantity)}>
                  add
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CurrencyInfoPage;
