import { all } from 'redux-saga/effects';
// saga 관리
import { authSagas } from '../features/auth/authSaga';
import { algoSagas } from '../features/algorithm/algorithmSaga';
// import { typingSagas } from '../features/typing/typingSaga';
import { friendSagas } from '../features/friend/friendSaga';
import { coinSagas } from '../features/coinflip/coinFlipSaga';
import { gameSagas } from '../features/game/gameSaga';
// rootSaga
export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...algoSagas,
    // ...typingSagas,
    ...friendSagas,
    ...coinSagas,
    ...gameSagas,
  ]);
}
