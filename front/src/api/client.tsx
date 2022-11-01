import axios, { AxiosRequestConfig } from 'axios';

const client = axios.create({
  // baseURL: 'http://127.0.0.1:8080',
  baseURL: 'https://k7e104.p.ssafy.io:8081',
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
    const { response } = error;
    console.log(response);
    const originalRequest = error.config;
    console.log(originalRequest);
    const token = localStorage.getItem('accessToken');
    if (response.status === 420) {
      const data = await client
        .post(
          'https://k7e104.p.ssafy.io:8081/api/auth/refresh',
          // 'http://127.0.0.1:8080/api/auth/refresh',
          JSON.stringify({ oldAccessToken: token }),
          {
            withCredentials: true,
          },
        )
        .catch((e) => {
          window.location.replace('/login');
        });
      console.log(data);
      localStorage.setItem('accessToken', data!.data);
      const accessToken = 'Bearer ' + data!.data;
      client.defaults.headers.Authorization = accessToken;
      console.log(originalRequest.headers.Authorization);

      return client(originalRequest);
    } else {
      window.location.replace('/login');
    }
  },
);

export default client;
