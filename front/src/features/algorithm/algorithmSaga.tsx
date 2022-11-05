import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  take,
  fork,
  delay,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { Action } from '../../models/algo';
import { algoActions } from './algorithmSlice';
import { confirmAlgoRoom } from '../../api/algoApi';

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

function* algoSaga() {
  const { enterAlgoRoom } = algoActions;
  yield takeLatest(enterAlgoRoom, enterAlgoRoomSaga);
}

export const algoSagas = [fork(algoSaga)];
