import client from "./client";

export const loginKakao = async (data: string) => {
  const res = await client.post('api/user/kakao', data)
  return res
}