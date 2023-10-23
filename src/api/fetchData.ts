import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coincap.io/v2", // Замените на базовый URL вашего API
});

export const fetchData = async (page: number, limit: number) => {
  try {
    const response = await api.get(
      `/assets/?offset=${(page - 1) * limit}&limit=${limit}`
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCoinDataById = async (id: string) => {
  try {
    const response = await api.get(`/assets/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAssetPriceHistory = async (id: string, interval: string) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const currentHour = currentDate.getHours();

  let startTimestamp: number;
  let endTimestamp: number;
  let intervalValue: string;

  if (interval === "d1") {
    intervalValue = "h1";
    startTimestamp = new Date(
      `${currentYear}-${currentMonth}-${currentDay}T00:00:00Z`
    ).getTime();
    endTimestamp = new Date(
      `${currentYear}-${currentMonth}-${currentDay}T${currentHour}:00:00Z`
    ).getTime();
  } else if (interval === "w1") {
    intervalValue = "d1";
    const lastWeekStartDate = new Date(currentDate);
    lastWeekStartDate.setDate(currentDay - 8);
    startTimestamp = lastWeekStartDate.getTime();
    endTimestamp = new Date(
      `${currentYear}-${currentMonth}-${currentDay}T00:00:00Z`
    ).getTime();
  } else if (interval === "m1") {
    intervalValue = "d1";
    const lastMonthStartDate = new Date(currentDate);
    lastMonthStartDate.setMonth(currentMonth - 2);
    startTimestamp = lastMonthStartDate.getTime();
    endTimestamp = new Date(
      `${currentYear}-${currentMonth}-${currentDay}T00:00:00Z`
    ).getTime();
  } else {
    throw new Error("Неподдерживаемый интервал");
  }
  try {
    const response = await api.get(
      `/assets/${id}/history?interval=${intervalValue}&start=${startTimestamp}&end=${endTimestamp}`
    );
    return response.data.data;
  } catch (error) {
    console.error(`Ошибка при получении истории цены монеты:${id}`, error);
    throw error;
  }
};
