import client from './client';

export const requestCoinFlipApi = async (data: any) => {
  const res = await client.post('ssafy/flip', data);
  return res;
};
