import client from './client';

export const fetchCsRecordApi = async () => {
  const res = await client.get('cs/record?page=0&size=20&sort=id,DESC');
  return res;
};

export const fetchTypingRecordApi = async () => {
  const res = await client.get('typing/record?page=0&size=20&sort=id,DESC');
  return res;
};

// 알고리즘 게임 기록 조회
export const myRecordRequest = async () => {
  const res = await client.get('/algo/record?page=0&size=20&sort=id,DESC');
  return res;
};
// 알고 1등 횟수 조회
export const myRecordRankRequest = async () => {
  const res = await client.get('/algo/record/rank');
  return res;
};
// 모든 게임 랭킹
export const allGameRankingRequest = async () => {
  const res = await client.get('ability/rank');
  return res;
};
