import client from "./client";

export const fetchAlgoRoomList = async () => {
  const res = await client.get('algo/room')
  return res
}

export const makeAlgoRoom =async (body: {
  roomCode: string
  time: string
  tier: string
  num: string}) => {
  const res = await client.post('algo/room', body)
  return res
}