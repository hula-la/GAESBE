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
import { getUserInfo } from '../../api/authApi';
import { AxiosResponse } from 'axios';

// 유저 정보 받아오기
function* fetchUserIngoSaga(action: any) {
  const { fetchUserInfoSuccess, fetchUserInfoError } = authActions;
  try {
    const response: AxiosResponse = yield call(getUserInfo);
    yield put(fetchUserInfoSuccess(response.data));
  } catch (e: any) {
    yield put(fetchUserInfoError(e.response));
  }
}

function* onFetchUserInfo() {
  const { fetchUserInfoStart } = authActions;
  yield takeLatest(fetchUserInfoStart, fetchUserIngoSaga);
}

export const authSagas = [fork(onFetchUserInfo)];
