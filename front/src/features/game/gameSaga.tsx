import { takeLatest, put, fork, call, take } from 'redux-saga/effects';
import { gameActions } from './gameSlice';
import { fetchCsRecordApi, fetchTypingRecordApi } from '../../api/gameApi';
import { AxiosResponse } from 'axios';

function* fetchRecordSaga(action: any) {
  const { fetchRecordSuccess, fetchRecordError } = gameActions;
  try {
    const response1: AxiosResponse = yield call(fetchCsRecordApi);
    const response2: AxiosResponse = yield call(fetchTypingRecordApi);
    yield put(
      fetchRecordSuccess({ cs: response1.data, typing: response2.data }),
    );
  } catch (e: any) {
    yield put(fetchRecordError(e.response));
  }
}

function* onfetchRecord() {
  const { fetchRecordStart } = gameActions;
  yield takeLatest(fetchRecordStart, fetchRecordSaga);
}

export const gameSagas = [fork(onfetchRecord)];
