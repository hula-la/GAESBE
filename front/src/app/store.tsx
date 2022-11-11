import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
// 관리하는 슬라이스들
import authReducer from '../features/auth/authSlice';
import gameReducer from '../features/game/gameSlice';
import algoReducer from '../features/algorithm/algorithmSlice';
import typingReducer from '../features/typing/typingSlice';
import friendReducer from '../features/friend/friendSlice';
import coinReducer from '../features/coinflip/coinFlipSlice';
// rootReducers by using combineReducers
const rootReducers = combineReducers({
  auth: authReducer,
  game: gameReducer,
  algo: algoReducer,
  typing: typingReducer,
  friend: friendReducer,
  coin: coinReducer,
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = configureStore({
  // 여러 슬라이서의 리듀서를 합침
  reducer: rootReducers,
  middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
