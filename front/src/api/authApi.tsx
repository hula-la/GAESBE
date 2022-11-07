import client from './client';

export const fetchUserInfoApi = async () => {
  const res = await client.get('user/me');
  return res;
};

export const createUserInfoApi = async (userInfo: any) => {
  const res = await client.post('user/modify', userInfo);
  return res;
};

export const checkNicknameApi = async (nickname: string) => {
  const res = await client.get(`user/modify/check/${nickname}`);
  console.log(res);
  return res;
};

export const deleteUserInfoApi: any = async () => {
  const res = await client.delete('user');
  return res;
};
