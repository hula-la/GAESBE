import client from './client';

export const fetchCharacterApi = async () => {
  const res = await client.get('item/character');
  // console.log('캐릭터 정보' + res);
  return res;
};

export const fetchOfficeApi = async () => {
  const res = await client.get('item/office');
  // console.log('오피스 정보' + res);
  return res;
};

export const requestBuyOfficeApi = async (officeId: number) => {
  const res = await client.post(`item/office/${officeId}`);

  // console.log('산 후 오피스 정보' + res);
  return res;
};

export const requestBuyCharacterApi = async (characterId: number) => {
  const res = await client.post(`item/office/${characterId}`);
  // console.log('산 후 캐릭터 정보' + res);
  return res;
};
