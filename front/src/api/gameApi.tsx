import client from './client';

export const fetchCsRecordApi = async () => {
  const res = await client.get('cs/record');
  return res;
};

export const fetchTypingRecordApi = async () => {
  const res = await client.get('typing/record');
  return res;
};
