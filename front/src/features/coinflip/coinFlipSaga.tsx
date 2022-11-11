import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { coinActions } from './coinFlipSlice';
import { requestCoinFlipApi } from '../../api/coinFlipApi';
import { Axios, AxiosResponse } from 'axios';

function* requestCoinFlipSaga(action: any) {
  const { requestCoinFlipSuccess, requestCoinFlipError } = coinActions;
  try {
    const response: AxiosResponse = yield call(
      requestCoinFlipApi,
      action.payload,
    );
    yield put(requestCoinFlipSuccess(response.data));
  } catch (e: any) {
    yield put(requestCoinFlipError(e.response));
  }
}

function* onRequestCoinFlip() {
  const { requestCoinFlipStart } = coinActions;
  yield takeLatest(requestCoinFlipStart, requestCoinFlipSaga);
}
export const coinSagas = [fork(onRequestCoinFlip)];
