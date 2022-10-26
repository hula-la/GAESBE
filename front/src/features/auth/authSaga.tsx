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
import { loginKakao } from '../../api/authApi'
import { AxiosResponse } from 'axios';

function* loginKakaoSaga({payload}: any) {
  const { loginKakaoSuccess, loginKakaoError } = authActions;
  try {
    const response:AxiosResponse = yield call(loginKakao, payload)
    yield put(loginKakaoSuccess(response.data))
  } catch (e) {
    yield put(loginKakaoError(e))
  }
}