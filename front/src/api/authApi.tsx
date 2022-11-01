import client from './client';

export const loginKakao = async (data: string) => {
  console.log(data);
  const res = await client.post('api/user/kakao', { access_token: data });
  console.log(res);
  return res;
};

export const loginNaver = async (data: string) => {
  const res = await client.post('api/user/naver', data);
  return res;
};

export const getUserInfo = async () => {
  const res = await client.get('api/user/me');
  return res;
};
