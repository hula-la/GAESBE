export interface UserInfo {
  nicknamge: string;
  imgUrl: string
}

export interface User {
  isLoading: boolean;
  userInfo: UserInfo[];
  error: string | null;
}