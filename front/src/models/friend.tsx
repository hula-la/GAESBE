export interface Action<T> {
  type: string
  payload: T
}

/**
 id: 아이디
 nickname: 닉네임
 profileChar: 프로필 사진 번호
 */
export interface FriendInterface {
  id: number
  nickname: string
  profileChar: number
}

export interface FriendsInterface {
  online: FriendInterface[]
  offline: FriendInterface[]
}
