export interface Action<T> {
  type: string
  payload: T
}

export interface FriendInterface {
  id: number
  nickname: string
  profileChar: number
}

export interface FriendsInterface {
  online?: FriendInterface[]
  offline?: FriendInterface[]
}