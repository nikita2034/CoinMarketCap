import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.coincap.io/v2', // Замените на базовый URL вашего API
});

export const fetchData = async (page:number,limit:number) => {
  try {
    const response = await api.get(`/assets/?offset=${(page - 1) * limit}&limit=${limit}`); // Замените на конкретный путь вашего API
    return response.data.data;
  } catch (error) {
    throw error;
  }
};