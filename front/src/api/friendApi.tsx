import client from "./client";

// 친구 신청
export const requsetFriendRequest = async (nickname: string) => {
  const res = await client.get('friend/request', {params: {nickname:nickname}})
  return res
}

// 친구 요청 목록
export const requestToMeList = async () => {
  const res = await client.get('friend/request/list')
  return res
}

// 친구 요청 수락
export const requestToMeAccept = async (friendId:number) => {
  const res = await client.get('friend/add', {params: {friendId:friendId}})
  return res
}

// 친구 요청 거절
export const requestToMeDelete = async (reqId:number) => {
  const res = await client.delete('/friend/request', {params: {reqId:reqId}})
  return res
}

// 친구 리스트 불러오기
export const fetchFriends = async () => {
  const res = await client.get('/friend/list')
  return res
}

// 친구 삭제하기
export const deleteFriend = async (friendId:number) => {
  const res = await client.delete('/friend', {params:{friendId:friendId}})
  return res
}