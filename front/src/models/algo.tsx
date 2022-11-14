export interface Action<T> {
  type: string
  payload: T
}

/**
roomCode : 방 코드 string
time : 문제 풀 시간 string
tier : 문제 티어 string
num : 입장한 사람 수 string
no : 현재 문제 index번호 string
start: 시작한 게임인지 boolean
master : userId string
*/
export interface AlgoRoomInterface {
  roomCode: string
  time: string
  tier: string
  num: string
  no : string
  start: boolean
  master: string
}

/**
 bjId: 백준아이디 string
 id: 유저아이디(pk) number
 nickname: 유저닉네임 string
 profileChar: 프로필사진 숫자 number
 */
export interface InGameUsersInterface {
  bjId: string
  id: number
  nickname: string
  profileChar: number
}

/**
 problemId : 문제 번호 string
 correct: 정답 수 string
 ratio: 정답률 string
 submit: 제출 수 string
 tag: 다국어? string
 title: 제목 string
 */
export interface ProblemInterface {
  problemId : string
  correct: string
  ratio: string
  submit: string
  tag: string
  title: string
}

/**
 userId: 유저아이디number
 roomCode: 방 코드string
 min: 걸린 시간(분)string
 nickName: 닉네임string
 profileChar: 프로필 사진number
 */
export interface RankingUserInfo {
  userId:number
  roomCode:string
  min:string
  nickName: string
  profileChar: number
}

/**
 roomCode: 방 코드 string
 problemId: 문제번호 string
 ranking: 내 순위 number
 code: 내 코드 string
 lanId: 언어코드
 (1001 : c++
 1002 : java
 1003 : python
 1004 : c)
 */
export interface RecordSendInterface {
  roomCode: string
  problemId: string
  ranking: number
  code: string
  lanId: number
}