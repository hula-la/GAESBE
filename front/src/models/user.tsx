export interface Action<T> {
  type: string
  payload: T
}


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
  luckExp: number;
  luckLv: number;
}

export interface User {
  isLoading: boolean;
  isDuplicate: boolean | null;
  userInfo: UserInfo[] | null;
  userAbility: UserAbility[] | null;
  error: string | null;
}


export interface OfficeInterface {
  officeId: number
  name: string
  minLv: number
  own: boolean
}

export interface CharactersInterface {
  characterId: number
  need: string
  own: boolean
}

export interface OfficesInterface {
  offices: OfficeInterface[]
}

export interface CharacterInterface {
  characters: CharactersInterface[]
}