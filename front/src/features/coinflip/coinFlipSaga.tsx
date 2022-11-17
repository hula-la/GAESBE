import { takeLatest, put, fork, call } from 'redux-saga/effects';
import { coinActions } from './coinFlipSlice';
import { fetchSsafyRecordApi, requestCoinFlipApi } from '../../api/coinFlipApi';
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

function* fetchSsafyRecordSaga(action: any) {
  const { fetchSsafyRecordSuccess, fetchSsafyRecordError } = coinActions;
  try {
    const response: AxiosResponse = yield call(fetchSsafyRecordApi);
    yield put(fetchSsafyRecordSuccess(response.data));
  } catch (e: any) {
    yield put(fetchSsafyRecordError(e.response));
  }
}

function* onFetchSsafyRecord() {
  const { fetchSsafyRecordStart } = coinActions;
  yield takeLatest(fetchSsafyRecordStart, fetchSsafyRecordSaga);
}
export const coinSagas = [fork(onRequestCoinFlip), fork(onFetchSsafyRecord)];
