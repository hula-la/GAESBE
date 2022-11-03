import {all, takeEvery, takeLatest, put, call, take, fork, delay} from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { action } from '../../models/action'
import { algoActions } from './algorithmSlice'
import { confirmAlgoRoom } from '../../api/algoApi'



function* enterAlgoBattleRoomSaga(action: action<string>) {
  try {
    const ok: AxiosResponse = yield call(confirmAlgoRoom, action.payload)
    if (ok.data === true) {
      const { enterAlgoBattleRoomSuccess } = algoActions
      yield put(enterAlgoBattleRoomSuccess(action.payload))
    } else {
      alert('방이 가득 찬 것 같아요.\n목록을 새로고침 해주세요')
    }
  } catch (error) {
    console.log(error)
    alert('방이 사라진 것 같아요.\n목록을 새로고침 해주세요')
  }
}

function* algoSaga() {
  const { enterAlgoBattleRoom } = algoActions
  yield takeLatest(enterAlgoBattleRoom, enterAlgoBattleRoomSaga)
}

export const algoSagas = [
  fork(algoSaga)
]