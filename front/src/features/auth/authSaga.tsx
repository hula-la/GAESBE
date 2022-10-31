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
import { loginKakao, loginNaver } from '../../api/authApi';
import { AxiosResponse } from 'axios';

// 카카오 로그인
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

// 네이버 로그인
function* loginNaverSaga(action: { payload: string }) {
  const { loginNaverSuccess, loginNaverError } = authActions;
  const body = action.payload;
  try {
    const response: AxiosResponse = yield call(loginNaver, body);
    yield put(loginNaverSuccess(response.data));
  } catch (e) {
    yield put(loginNaverError(e));
  }
}

function* onLoginNaver() {
  const { loginNaverStart } = authActions;
  yield takeLatest(loginNaverStart, loginNaverSaga);
}

export const authSagas = [fork(onLoginKakao), fork(onLoginNaver)];
