import { configureStore } from '@reduxjs/toolkit';
import { all, call } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import tasksSlice from './tasks/tasks.slice';
import tasksSaga from './tasks/tasks.saga';

const saga = createSagaMiddleware();
function* rootSaga() {
  yield all([call(tasksSaga)]);
}

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
  },
  middleware: [saga],
});
saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
