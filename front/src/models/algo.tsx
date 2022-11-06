export interface Action<T> {
  type: string
  payload: T
}

/**
AlgoRoomInterface
code : 방 코드
time : 푼제 풀 시간
tier : 문제 티어
num : 입장한 사람 수
no : 현재 문제 index번호
master : userId
*/
export interface AlgoRoomInterface {
  roomCode: string
  time: string
  tier: string
  num: string
  no : string
  master?: string
}

/**
 bjId: 백준아이디
 id: 유저아이디(pk)
 nickname: 유저닉네임
 profileChar: 프로필사진 숫자
 */
export interface InGameUsersInterface {
  bjId: string
  id: number
  nickname: string
  profileChar: number
}

/**
 problemId : 문제 번호
 correct: 정답 수
 ratio: 정답률
 submit: 제출 수
 tag: 다국어?
 title: 제목
 */
export interface ProblemInterface {
  problemId : string
  correct: string
  ratio: string
  submit: string
  tag: string
  title: string
}