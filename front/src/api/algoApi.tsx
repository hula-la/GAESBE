import client from "./client";

export const fetchAlgoRoomList = async () => {
  const res = await client.get('algo/room')
  return res
}

export const makeAlgoRoom = async (body: {
  roomCode: string
  time: string
  tier: string
  num: string}) => {
  const res = await client.post('algo/room', body)
  return res
}

export const confirmAlgoRoom = async (params: string) => {
  const res = await client.get(`algo/confirm/${params}`)
  return res
}

export const bojUserIdRequest = async (roomCode: string, userBjId: string) => {
  const res = await client.get(`/algo/user/problem/${roomCode}/${userBjId}`)
}