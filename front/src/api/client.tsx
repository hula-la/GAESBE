import axios, { AxiosRequestConfig } from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config: AxiosRequestConfig) => {
  const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
  config.headers!.Authorization = accessToken;
  return config;
});

export default client;
