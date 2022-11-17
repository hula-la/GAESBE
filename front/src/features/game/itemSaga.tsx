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
import { itemActions } from './itemSlice';
import {
  fetchCharacterApi,
  fetchOfficeApi,
  requestBuyOfficeApi,
  requestBuyCharacterApi,
} from '../../api/itemApi';
import { AxiosResponse } from 'axios';

// 유저 정보 받아오기
function* fetchCharacterSaga(action: any) {
  const { fetchCharacterSuccess, fetchCharacterError } = itemActions;
  try {
    const response: AxiosResponse = yield call(fetchCharacterApi);
    yield put(fetchCharacterSuccess(response.data));
  } catch (e: any) {
    yield put(fetchCharacterError(e.response));
  }
}

function* onFetchCharacterSaga() {
  const { fetchCharacterStart } = itemActions;
  yield takeLatest(fetchCharacterStart, fetchCharacterSaga);
}

// 오피스 불러오기
function* fetchOfficeSaga(action: any) {
  const { fetchOfficeSuccess, fetchOfficeError } = itemActions;
  try {
    const response: AxiosResponse = yield call(fetchOfficeApi);
    yield put(fetchOfficeSuccess(response.data));
  } catch (e: any) {
    yield put(fetchOfficeError(e.response));
  }
}

function* onFetchOfficeSaga() {
  const { fetchOfficeStart } = itemActions;
  yield takeLatest(fetchOfficeStart, fetchOfficeSaga);
}

// 오피스 사기
function* requestBuyOfficeSage(action: any) {
  const { fetchOfficeSuccess, fetchOfficeError, fetchOfficeStart } =
    itemActions;
  try {
    const response: AxiosResponse = yield call(
      requestBuyOfficeApi,
      action.payload,
    );
    yield put(fetchOfficeSuccess(response.data));
    yield put(fetchOfficeStart());
  } catch (e: any) {
    yield put(fetchOfficeError(e.response));
  }
}

function* onRequestBuyOfficeSage() {
  const { requestBuyOfficeStart } = itemActions;
  yield takeLatest(requestBuyOfficeStart, requestBuyOfficeSage);
}

// 캐릭터 사기
function* requestBuyCharacterSaga(action: any) {
  const { fetchCharacterSuccess, fetchCharacterError } = itemActions;
  try {
    const response: AxiosResponse = yield call(
      requestBuyCharacterApi,
      action.payload,
    );
    yield put(fetchCharacterSuccess(response.data));
  } catch (e: any) {
    yield put(fetchCharacterError(e.response));
  }
}

function* onRequestBuyCharacterSaga() {
  const { requestBuyCharacterStart } = itemActions;
  yield takeLatest(requestBuyCharacterStart, requestBuyCharacterSaga);
}

export const itemSagas = [
  fork(onFetchCharacterSaga),
  fork(onFetchOfficeSaga),
  fork(onRequestBuyOfficeSage),
  fork(onRequestBuyCharacterSaga),
];
