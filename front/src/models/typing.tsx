export interface Action<T> {
  type: any;
  payload: T;
}

export interface TypingRoomInterface {
  lang: string;
  id: string;
  nickName: string;
  socketId: string;
  roomCode: string | null;
  isCreat: boolean;
}
