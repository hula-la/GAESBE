export interface UserInfo {
  nicknamge: string;
  imgUrl: string;
}

export interface UserAbility {
  id: number;
  userId: number;
  algorithmExp: number;
  algorithmLv: number;
  csExp: number;
  csLv: number;
  typingExp: number;
  typingLv: number;
}

export interface User {
  isLoading: boolean;
  isDuplicate: boolean | null;
  userInfo: UserInfo[] | null;
  userAbility: UserAbility[] | null;
  error: string | null;
}
