import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCoinDataById } from "../../api/fetchData";
import Header from "../../components/Header/Header";
import styles from "./CurrencyInfoPage.module.scss";
import PriceChart from "../../components/PriceChart/PriceChart";
import { GiRank1 } from "react-icons/gi";
import { Coin } from "../../types/coin";
import { formatLargeNumbers } from "../../utils/formatLargeNumbers";
import BlockPurchaseOptions from "../../components/BlockPurchaseOptions/BlockPurchaseOptions";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
type Interval = "d1" | "w1" | "m1";

function CurrencyInfoPage() {
  const { id } = useParams();
  const [coinDetails, setCoinDetails] = useState<Coin | null>();
  const [period, setPeriod] = useState<Interval>("d1");
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchCoinDataById(String(id));
        setCoinDetails(data);
        setLoading(false);
      } catch (error) {
        navigate('/error')
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  return (
    <>
      <Header />
      {loading ? (
        <ClipLoader
          loading={loading}
          className={styles.spinnerStyle}
          size={150}
        />
      ) : (
        <>
          <div className={styles.container}>
            <Link to="/" className={styles.button_back}>
              Go back
            </Link>
            {coinDetails && (
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
            )}
            {coinDetails && (
              <div className={styles.block_main}>
                <div className={styles.chart}>
                  <div className={styles.chart_options}>
                    <div className={styles.chart_options_title}>
                      Schedule of changes for:
                    </div>
                    <button
                      className={`${styles.chart_options_button} ${
                        period === "d1" ? styles.selected : ""
                      }`}
                      onClick={() => setPeriod("d1")}
                    >
                      day
                    </button>
                    <button
                      className={`${styles.chart_options_button} ${
                        period === "w1" ? styles.selected : ""
                      }`}
                      onClick={() => setPeriod("w1")}
                    >
                      7 day
                    </button>
                    <button
                      className={`${styles.chart_options_button} ${
                        period === "m1" ? styles.selected : ""
                      }`}
                      onClick={() => setPeriod("m1")}
                    >
                      month
                    </button>
                  </div>
                  <PriceChart assetId={String(id)} period={period} />
                </div>
                <BlockPurchaseOptions coinDetails={coinDetails} />
              </div>
            )}
            {!coinDetails && <div className={styles.error}>Invalid currency id!</div>}
          </div>
        </>
      )}
    </>
  );
}

export default CurrencyInfoPage;
