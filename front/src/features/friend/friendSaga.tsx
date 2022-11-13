import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { Action } from '../../models/friend';
import { friendActions } from './friendSlice';
import { fetchChatApi, requsetFriendRequest } from '../../api/friendApi';

function* requestFriendSaga(action: Action<string>) {
  try {
    const res: AxiosResponse = yield call(requsetFriendRequest, action.payload);
    if (res.status === 200) {
      yield put(friendActions.requestFriendFinish());
      yield alert(`${action.payload}님에게 친구신청을 하였습니다`);
      yield put(friendActions.setIsSuccess(true));
    }
  } catch (error: any) {
    if (error.response.status === 480) {
      yield alert(`${action.payload}님은 존재하지 않습니다`);
    } else if (error.response.status === 450) {
      yield alert('나 자신은 이미 나의 평생 친구입니다');
    } else if (error.response.status === 486) {
      yield alert('이미 친구 신청을 보낸 상대입니다');
    } else if (error.response.status === 487) {
      yield alert('당신에게 요청을 보낸 상대입니다');
    } else if (error.response.status === 445) {
      yield alert('이미 친구입니다');
    }
  }
}
function* fetchChatSaga(action: any) {
  try {
    const res: AxiosResponse = yield call(fetchChatApi);
    yield put(friendActions.fetchChatSuccess(res.data));
  } catch (e: any) {
    yield put(friendActions.fetchChatError(e));
  }
}

function* friendSaga() {
  yield takeLatest(friendActions.requestFriendStart, requestFriendSaga);
  yield takeLatest(friendActions.fetchChatStart, fetchChatSaga);
}

export const friendSagas = [fork(friendSaga)];
