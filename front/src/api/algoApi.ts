import client from "./client";

export const fetchAlgoRoomList =async () => {
  const res = await client.get('algo/room')
  return res
}