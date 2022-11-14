import client from "./client";

import {RecordSendInterface} from '../models/algo'

export const fetchAlgoRoomList = async () => {
  const res = await client.get('algo/room')
  return res
}

export const makeAlgoRoom = async (body: {
  roomCode: string
  time: string
  tier: string
  num: string
  master: string
  start: boolean}) => {
  const res = await client.post('algo/room', body)
  return res
}

export const confirmAlgoRoom = async (params: string) => {
  const res = await client.get(`algo/confirm/${params}`)
  return res
}

export const bojUserIdRequest = async (roomCode: string, userBjId: string) => {
  const res = await client.get(`/algo/user/problem/${roomCode}/${userBjId}`)
  return res
}

export const checkMyAnswerRequest = async (meta:{roomCode:string, problemId: number, userBjId: string, lanId: number}) => {
  const body = {'problemId':meta.problemId, 'userBjId':meta.userBjId, 'lanId':meta.lanId}
  const res = await client.post(`/algo/solve/${meta.roomCode}`, body)
  return res
}

export const endGame = async (body:RecordSendInterface) => {
  const res = await client.post('/algo/record', body)
  return res
}

// 내가 게임중인지 판단하는 요청(게임중이면 방 생성 불가능)
export const roomMakePlaying = async () => {
  const res = await client.get('/algo/play')
  return res
}

// 백준 연동 코드 request
export const BjConnectCodeRequest = async () => {
  const res = await client.get('/algo/bj/code')
  return res
}

// 백준 연동 확인
export const BjConnectCheck = async (payload:string) => {
  const res = await client.get(`/algo/bj/code/confirm/${payload}`)
  return res
}