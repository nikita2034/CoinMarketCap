import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import { fetchCoinDetails } from '../../api/fetchCoinDetails'; // Создайте функцию для получения данных монеты
// import { LineChart } from './LineChart'; // Создайте компонент для графика изменения цены
import Header from '../../components/Header/Header';
import styles from './CurrencyInfoPage.module.scss'
import { Coin } from '../../types/coin';

const CoinDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [coinDetails, setCoinDetails] = useState<Coin| null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchDetails = async () => {
    //   try {
    //     const data = await fetchCoinDetails(id); // Замените на свою функцию для получения данных монеты
    //     setCoinDetails(data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Ошибка при получении данных монеты:', error);
    //     setLoading(false);
    //   }
    // };

    // fetchDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!coinDetails) {
    return <div>Монета не найдена</div>;
  }

  return (
    <div>
      <Header/>
      <Link to="/">Вернуться назад</Link>
      <h1>{coinDetails.name} ({coinDetails.symbol})</h1>
      <p>Rank: {coinDetails.rank}</p>
      <p>Supply: {coinDetails.supply}</p>
      <p>Max Supply: {coinDetails.maxSupply}</p>
      <p>Price in USD: {coinDetails.priceUsd}</p>
      <p>Market Cap in USD: {coinDetails.marketCapUsd}</p>
      {/* Добавьте изображение монеты */}
      {/* Добавьте компонент для выбора опции и графика изменения цены */}
      {/* <LineChart /> */}
      <button>Add to Portfolio</button>
    </div>
  );
};

export default CoinDetails;