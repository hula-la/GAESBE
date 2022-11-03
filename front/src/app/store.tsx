import {
  configureStore,
  combineReducers,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
// 관리하는 슬라이스들
import authReducer from '../features/auth/authSlice';
import unityReducer from '../features/unity/unitySlice';
import algoReducer from '../features/algorithm/algorithmSlice'

// rootReducers by using combineReducers
const rootReducers = combineReducers({
  auth: authReducer,
  unity: unityReducer,
  algo: algoReducer
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
