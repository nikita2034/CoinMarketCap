import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getAssetPriceHistory } from "../../api/fetchData";
import { formatLargeNumbers } from "../../utils/formatLargeNumbers";
interface PriceData {
  priceUsd: number;
  time: number;
}

interface PriceChartProps {
  assetId: string;
  period: "d1" | "w1" | "m1";
}

function PriceChart({ assetId, period }: PriceChartProps) {
  const [priceData, setPriceData] = useState<PriceData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAssetPriceHistory(assetId, period);
        setPriceData(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, [assetId, period]);

  if (!assetId) {
    return <div>Loading...</div>;
  }

  const xCategories = priceData.map((item) => {
    const time = new Date(item.time);
    if (period === "d1") {
      const hours = time.getHours().toString().padStart(2, "0");
      const minutes = time.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } else if (period === "w1") {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "numeric",
        month: "short",
      };
      return time.toLocaleDateString(undefined, options);
    } else {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      return time.toLocaleDateString(undefined, options);
    }
  });

  const yData = priceData.map((item) =>
    parseFloat(String(formatLargeNumbers(Number(item.priceUsd))))
  );

  const chartData = {
    options: {
      chart: {
        id: "price-chart",
      },
      xaxis: {
        categories: xCategories,
      },
    },
    series: [
      {
        name: "Price (USD)",
        data: yData,
      },
    ],
  };

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
}

export default PriceChart;
