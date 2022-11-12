import {all, takeEvery, takeLatest, put, call, take, fork, delay} from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { Action, AlgoRoomInterface, RecordSendInterface } from '../../models/algo'
import { algoActions } from './algorithmSlice'
import { confirmAlgoRoom, makeAlgoRoom, checkMyAnswerRequest, roomMakePlaying, endGame } from '../../api/algoApi'


function* enterAlgoRoomSaga(action: Action<AlgoRoomInterface>) {
  try {
    const ok: AxiosResponse = yield call(confirmAlgoRoom, action.payload.roomCode);
    if (ok.data.result === true) {
      yield put(algoActions.enterAlgoRoomSuccess(action.payload));
    } else {
      alert(ok.data.msg);
      yield put(algoActions.setNeedReload(true))
    }
  } catch (error) {
    alert('방이 사라진 것 같아요.\n목록을 새로고침 할게요');
    yield put(algoActions.setNeedReload(true))
  }
}

function* creatAlgoRoomSaga(action: Action<AlgoRoomInterface>) {
  try {
    const res1: AxiosResponse = yield call(roomMakePlaying)
    if (res1.data) {
      const res: AxiosResponse = yield call(makeAlgoRoom, action.payload)
      if (res.status === 200) {
        yield put(algoActions.enterAlgoRoom(res.data))
      }
    } else {
      alert('이미 다른 게임을 진행중인 것 아닌가요?')
    }
  } catch (error) {
    console.log(error)
  }
}

function* checkMyAnswerRequestSaga(action: Action<{roomCode:string, problemId: number, userBjId: string, lanId: number}>) {
  try {
    const res: AxiosResponse = yield call(checkMyAnswerRequest, action.payload)
    if (res.status === 200) {
      if (res.data.result === 1) {
        yield put(algoActions.solveSuccess(true))
      }
      yield alert(res.data.msg)
    }
  } catch (error) {
    console.log(error)
    yield put(algoActions.loadingEnd())
  }
  yield put(algoActions.setLoadingMsg(''))
}

function* sendMyRankSaga(action: Action<RecordSendInterface>) {
  try {
    const res: AxiosResponse = yield call(endGame, action.payload)
    if (res.status===200) {
      yield put(algoActions.setGameResult(res.data))
      yield put(algoActions.loadingEnd())
    }
  } catch (error) {
    console.log(error)
  }
}

function* algoSaga() {
  yield takeLatest(algoActions.enterAlgoRoom, enterAlgoRoomSaga)
  yield takeLatest(algoActions.creatAlgoRoom, creatAlgoRoomSaga)
  yield takeLatest(algoActions.checkMyAnswerRequestStart, checkMyAnswerRequestSaga)
  yield takeLatest(algoActions.sendMyRank, sendMyRankSaga)
}

export const algoSagas = [fork(algoSaga)];
