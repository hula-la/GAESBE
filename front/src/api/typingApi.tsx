import client from './client';

export const enterTypingRoom = async (body: {
  lang?: string;
  id?: string;
  nickName?: string;
  socketId?: string;
  roomCode?: string;
  isCreat?: boolean;
}) => {
  const res = await client.post('typing/enter', body);
  console.log('이거 콘솔?', res);
  return res;
};
