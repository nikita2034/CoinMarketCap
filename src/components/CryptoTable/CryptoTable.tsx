import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../api/fetchData";
import { CgAdd } from "react-icons/cg";
import { GrNext, GrPrevious } from "react-icons/gr";
import styles from "./CryptoTable.module.scss";
import { Coin } from "../../types/coin";
import BuyCoinModal from "../BuyCoinModal/BuyCoinModal";
import { formatLargeNumbers } from "../../utils/formatLargeNumbers";
import { useMyContext } from "../../context/Context";
const CryptoTable: React.FC = () => {
  const {  setValue } = useMyContext();
  const navigate = useNavigate();
  const [data, setData] = useState<Coin[]>([]); // Используйте конкретный тип данных вместо any
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string | null>(null); // Начально сортировка не выбрана
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [coin, setCoin] = useState<Coin>();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Укажите количество элементов на странице
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  console.log(data);
  for (let i = 1; i <= Math.ceil(100 / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  function sortByPrice(a: Coin, b: Coin): number {
    const priceA = parseFloat(a.priceUsd);
    const priceB = parseFloat(b.priceUsd);
    return sortDirection === "asc" ? priceA - priceB : priceB - priceA;
  }

  function sortByMarketCap(a: Coin, b: Coin): number {
    const marketCapA = parseFloat(a.marketCapUsd);
    const marketCapB = parseFloat(b.marketCapUsd);
    return sortDirection === "asc"
      ? marketCapA - marketCapB
      : marketCapB - marketCapA;
  }

  function sortByChangePercent(a: Coin, b: Coin): number {
    const changePercentA = parseFloat(a.changePercent24Hr);
    const changePercentB = parseFloat(b.changePercent24Hr);
    return sortDirection === "asc"
      ? changePercentA - changePercentB
      : changePercentB - changePercentA;
  }

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

  const openModal = (selectedСoin: Coin,event:React.MouseEvent<SVGElement>) => {
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
        const result = await fetchData(currentPage, itemsPerPage);
        setData(result);
        setValue(result)
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchDataFromApi();
  }, [currentPage, itemsPerPage]);

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
          placeholder="Поиск по названию монеты"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th className={styles.heading}>Name</th>
            <th onClick={() => handleSort("price")} className={styles.heading}>
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
            .slice() // Создайте копию данных перед сортировкой
            .sort((a, b) => {
              if (sortBy === "price") {
                return sortByPrice(a, b);
              } else if (sortBy === "marketCap") {
                return sortByMarketCap(a, b);
              } else if (sortBy === "changePercent") {
                return sortByChangePercent(a, b);
              }
              return 0;
            })
            .map((coin: Coin) => (
              <>
                 
              <tr key={coin.id} >
              <td>
                  <CgAdd
                    className={styles.icon_add}
                    onClick={(event) => openModal(coin,event)}
                  />
                </td>
                <td className={styles.coin} onClick={() => navigateToOtherPage(coin.id)}>{coin.symbol}</td>
                {/* <td><img src={coin.logoUrl} alt={coin.symbol} /></td> */}
                <td className={styles.coin} onClick={() => navigateToOtherPage(coin.id)}>
                  {formatLargeNumbers(Number(coin.priceUsd))}$
                </td>
                <td className={styles.coin} onClick={() => navigateToOtherPage(coin.id)}>
                  {formatLargeNumbers(Number(coin.marketCapUsd))}$
                </td>
                <td className={styles.coin} onClick={() => navigateToOtherPage(coin.id)}>
                  {formatLargeNumbers(Number(coin.volumeUsd24Hr))}%
                </td></tr>
           
              </>
            ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.button}
        >
          <GrPrevious />
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={styles.button}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className={styles.button}
        >
          <GrNext />
        </button>
      </div>

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
};

export default CryptoTable;
