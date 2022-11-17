import client from './client';

// CS 게임 기록 조회
export const fetchCsRecordApi = async () => {
  const res = await client.get('cs/record?page=0&size=20&sort=id,DESC');
  return res;
};

// CS 1등 횟수 조회
export const myCsWinRequest = async () => {
  const res = await client.get('cs/record/rank');
  return res;
};

// 타이핑 게임 기록 조회
export const fetchTypingRecordApi = async () => {
  const res = await client.get('typing/record?page=0&size=20&sort=id,DESC');
  return res;
};

// 타이핑 1등 횟수 조회
export const myTypingWinRequest = async () => {
  const res = await client.get('typing/record/rank');
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
export const mySsafyRecordRequest = async () => {
  const res = await client.get('ssafy/record?page=0&size=20&sort=id,DESC');
  return res;
};

export const mySsafyWinRequest = async () => {
  const res = await client.get('ssafy/record/rank');
  return res
};
export const allGameRankingRequest = async () => {
  const res = await client.get('ability/rank');

  return res;
};
