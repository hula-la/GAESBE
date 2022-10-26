import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from 'redux-saga/effects';
import { authActions } from './authSlice';
import { loginKakao } from '../../api/authApi';
import { AxiosResponse } from 'axios';

function* loginKakaoSaga(action: { payload: string }) {
  const { loginKakaoSuccess, loginKakaoError } = authActions;
  const body = action.payload;
  try {
    const response: AxiosResponse = yield call(loginKakao, body);
    yield put(loginKakaoSuccess(response.data));
  } catch (e) {
    yield put(loginKakaoError(e));
  }
}

function* onLoginKakao() {
  const { loginKakaoStart } = authActions;
  yield takeLatest(loginKakaoStart, loginKakaoSaga);
}

export const authSagas = [fork(onLoginKakao)];
