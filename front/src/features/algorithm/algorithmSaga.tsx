import {all, takeEvery, takeLatest, put, call, take, fork, delay} from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { Action, AlgoRoomInterface } from '../../models/algo'
import { algoActions } from './algorithmSlice'
import { confirmAlgoRoom, makeAlgoRoom } from '../../api/algoApi'


function* enterAlgoRoomSaga(action: Action<AlgoRoomInterface>) {
  try {
    const ok: AxiosResponse = yield call(confirmAlgoRoom, action.payload.roomCode);
    if (ok.data === true) {
      yield put(algoActions.enterAlgoRoomSuccess(action.payload));
    } else {
      alert('방이 가득 찬 것 같아요.\n목록을 새로고침 할게요');
      yield put(algoActions.setNeedReload(true))
    }
  } catch (error) {
    alert('방이 사라진 것 같아요.\n목록을 새로고침 할게요');
    yield put(algoActions.setNeedReload(true))
  }
}

function* creatAlgoRoomSaga(action: Action<AlgoRoomInterface>) {
  try {
    const res: AxiosResponse = yield call(makeAlgoRoom, action.payload)
    if (res.status === 200) {
      yield put(algoActions.enterAlgoRoom(res.data))
    }
  } catch (error) {
    console.log(error)
  }
}

function* algoSaga() {
  // const { enterAlgoRoom, creatAlgoRoom } = algoActions
  yield takeLatest(algoActions.enterAlgoRoom, enterAlgoRoomSaga)
  yield takeLatest(algoActions.creatAlgoRoom, creatAlgoRoomSaga)
}

export const algoSagas = [fork(algoSaga)];
