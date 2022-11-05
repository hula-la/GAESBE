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
import { Action } from '../../models/typing';
import { typingActions } from './typingSlice';
import { TypingRoomInterface } from '../../models/typing';
import { enterTypingRoom } from '../../api/typingApi';
function* enterTypingRoomSaga(action: Action<any>) {
  try {
    const res: AxiosResponse = yield call(enterTypingRoom, action.payload);
    console.log(res, '이게 res');
  } catch (error) {
    console.log('여기서', error);
  }
}

function* typingSaga() {
  const { createTypingRoom } = typingActions;
  yield takeLatest(createTypingRoom, enterTypingRoomSaga);
}

export const typingSagas = [fork(typingSaga)];
