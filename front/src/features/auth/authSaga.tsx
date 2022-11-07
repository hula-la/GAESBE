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
import {
  fetchUserInfoApi,
  createUserInfoApi,
  checkNicknameApi,
  deleteUserInfoApi,
} from '../../api/authApi';
import { AxiosResponse } from 'axios';

// 유저 정보 받아오기
function* fetchUserInfoSaga(action: any) {
  const { fetchUserInfoSuccess, fetchUserInfoError } = authActions;
  try {
    const response: AxiosResponse = yield call(fetchUserInfoApi);
    yield put(fetchUserInfoSuccess(response.data));
  } catch (e: any) {
    yield put(fetchUserInfoError(e.response));
  }
}

function* onFetchUserInfo() {
  const { fetchUserInfoStart } = authActions;
  yield takeLatest(fetchUserInfoStart, fetchUserInfoSaga);
}

// 유저 초기 정보 설정
function* createUserInfoSaga(action: any) {
  const { createUserInfoSuccess, createUserInfoError } = authActions;
  try {
    const response: AxiosResponse = yield call(
      createUserInfoApi,
      action.payload,
    );
    yield put(createUserInfoSuccess(response.data));
  } catch (e: any) {
    yield put(createUserInfoError(e.response));
  }
}

function* onCreateUserInfo() {
  const { createUserInfoStart } = authActions;
  yield takeLatest(createUserInfoStart, createUserInfoSaga);
}

// 닉네임 중복 체크
function* checkNicknameSaga(action: any) {
  const { checkNicknameSuccess, checkNicknameError } = authActions;
  try {
    const response: AxiosResponse = yield call(
      checkNicknameApi,
      action.payload,
    );
    yield put(checkNicknameSuccess(response.data));
  } catch (e: any) {
    yield put(checkNicknameError(e.response));
  }
}

function* onCheckNickname() {
  const { checkNicknameStart } = authActions;
  yield takeLatest(checkNicknameStart, checkNicknameSaga);
}

function* deleteUserInfoSaga() {
  try {
    const response: AxiosResponse = yield call(deleteUserInfoApi);
    if (response.status === 200) {
      // 로그아웃시키자
    }
  } catch (error) {
    console.log(error);
  }
}

export const authSagas = [
  fork(onFetchUserInfo),
  fork(onCreateUserInfo),
  fork(onCheckNickname),
  fork(onCheckNickname),
  fork(deleteUserInfoSaga),
];
