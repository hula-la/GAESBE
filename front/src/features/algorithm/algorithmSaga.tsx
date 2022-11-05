import {all, takeEvery, takeLatest, put, call, take, fork, delay} from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { Action, AlgoRoomInterface } from '../../models/algo'
import { algoActions } from './algorithmSlice'
import { confirmAlgoRoom, makeAlgoRoom } from '../../api/algoApi'


function* enterAlgoRoomSaga(action: Action<string>) {
  try {
    const ok: AxiosResponse = yield call(confirmAlgoRoom, action.payload);
    if (ok.data === true) {
      const { enterAlgoRoomSuccess } = algoActions;
      yield put(enterAlgoRoomSuccess(action.payload));
    } else {
      alert('방이 가득 찬 것 같아요.\n목록을 새로고침 해주세요');
    }
  } catch (error) {
    console.log(error);
    alert('방이 사라진 것 같아요.\n목록을 새로고침 해주세요');
  }
}

function* creatAlgoRoomSaga(action: Action<AlgoRoomInterface>) {
  try {
    const res: AxiosResponse = yield call(makeAlgoRoom, action.payload)
    if (res.status === 200) {
      yield put(algoActions.enterAlgoRoom(res.data.roomCode))
    }
  } catch (error) {
    console.log(error)
  }
}

function* algoSaga() {
  const { enterAlgoRoom, creatAlgoRoom } = algoActions
  yield takeLatest(enterAlgoRoom, enterAlgoRoomSaga)
  yield takeLatest(creatAlgoRoom, creatAlgoRoomSaga)
}

export const algoSagas = [fork(algoSaga)];
