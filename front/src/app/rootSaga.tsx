import { all } from 'redux-saga/effects';
// saga 관리
import { authSagas } from '../features/auth/authSaga';

// rootSaga
export default function* rootSaga() {
  yield all([...authSagas]);
}
