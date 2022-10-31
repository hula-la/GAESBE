import axios, { AxiosRequestConfig } from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  // baseURL: 'https://k7e104.p.ssafy.io:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    config.headers!.Authorization = null;
  } else {
    const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
    config.headers!.Authorization = accessToken;
  }
  return config;
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const { response: errorResponse } = error;
    const originalRequest = error.config;
    console.log(errorResponse);
    if (errorResponse.status === 420) {
      const data = await axios.post('http://127.0.0.1:8080/api/auth/refresh', {
        withCredentials: true,
      });
      console.log(data);
    } else {
      // 그냥 다시 로그인 해라!@
    }
  },
);

export default client;
