export interface UserInfo {
  nicknamge: string;
  imgUrl: string;
}

export interface User {
  isLoading: boolean;
  isDuplicate: boolean | null;
  userInfo: UserInfo[] | null;
  error: string | null;
}
