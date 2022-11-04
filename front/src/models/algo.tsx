export interface Action<T> {
  type: string
  payload: T
}

export interface AlgoRoomInterface {
  roomCode: string
  time: string
  tier: string
  num: string
  master?: string
}