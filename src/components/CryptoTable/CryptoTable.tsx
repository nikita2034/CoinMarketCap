import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api/fetchData";
import { useMyContext } from "../../context/Context";

import { formatLargeNumbers } from "../../utils/formatLargeNumbers";
import { sortByPrice } from "../../utils/sortByPrice";
import { sortByMarketCap } from "../../utils/sortByMarketCap";
import { sortByChangePercent } from "../../utils/sortByChangePercent";

import { Coin } from "../../types/coin";

import styles from "./CryptoTable.module.scss";
import { CgAdd } from "react-icons/cg";
import { ClipLoader } from "react-spinners";

import Pagination from "../Pagination/Pagination";
import BuyCoinModal from "../BuyCoinModal/BuyCoinModal";

function CryptoTable() {
  const { setValue } = useMyContext();
  const navigate = useNavigate();
  const [data, setData] = useState<Coin[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [coin, setCoin] = useState<Coin>();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  function handleSort(column: string) {
    if (column === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (
    selectedСoin: Coin,
    event: React.MouseEvent<SVGElement>
  ) => {
    setCoin(selectedСoin);
    event.stopPropagation();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData(currentPage, 10);
        setData(result);
        setLoading(false);
        setValue(result);
      } catch (error) {
        navigate("/error");
      }
    };

    fetchDataFromApi();
  }, [currentPage]);

  function navigateToOtherPage(id: string) {
    navigate(`/currency/${id}`);
  }

  return (
    <div className={styles.container}>
      <div className={styles.header_block}>
        <div className={styles.title}>
          Today's Cryptocurrency Prices by Market Cap
        </div>
        <input
          className={styles.search_coins}
          type="text"
          placeholder="coin search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <ClipLoader loading={loading} size={150} />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th className={styles.heading}>Name</th>
              <th
                onClick={() => handleSort("price")}
                className={styles.heading}
              >
                Price{" "}
                {sortBy === "price" && (
                  <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th
                onClick={() => handleSort("marketCap")}
                className={styles.heading}
              >
                Market Cap
                {sortBy === "marketCap" && (
                  <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
              <th
                onClick={() => handleSort("changePercent")}
                className={styles.heading}
              >
                Volume(24h)
                {sortBy === "changePercent" && (
                  <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              ?.filter((coin) =>
                coin.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice()
              .sort((a, b) => {
                if (sortBy === "price") {
                  return sortByPrice({ a, b, sortDirection });
                } else if (sortBy === "marketCap") {
                  return sortByMarketCap({ a, b, sortDirection });
                } else if (sortBy === "changePercent") {
                  return sortByChangePercent({ a, b, sortDirection });
                }
                return 0;
              })
              .map((coin: Coin) => (
                <>
                  <tr key={coin.id}>
                    <td>
                      <CgAdd
                        className={styles.icon_add}
                        onClick={(event) => openModal(coin, event)}
                      />
                    </td>
                    <td
                      className={styles.coin}
                      onClick={() => navigateToOtherPage(coin.id)}
                    >
                      {coin.symbol}
                    </td>
                    <td
                      className={styles.coin}
                      onClick={() => navigateToOtherPage(coin.id)}
                    >
                      {formatLargeNumbers(Number(coin.priceUsd))}$
                    </td>
                    <td
                      className={styles.coin}
                      onClick={() => navigateToOtherPage(coin.id)}
                    >
                      {formatLargeNumbers(Number(coin.marketCapUsd))}$
                    </td>
                    <td
                      className={styles.coin}
                      onClick={() => navigateToOtherPage(coin.id)}
                    >
                      {formatLargeNumbers(Number(coin.volumeUsd24Hr))}%
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      )}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {modalIsOpen && (
        <div className={styles.modal}>
          <BuyCoinModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            coinData={coin}
            maxQuantity={10}
            minQuantity={1}
            handleOverlayClick={handleOverlayClick}
          />
        </div>
      )}
    </div>
  );
}

export default CryptoTable;
