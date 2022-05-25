import { takeEvery, put, delay, select } from 'redux-saga/effects';

import { RootState } from '..';

const SERVER_DELAY = 2000;

import {
  getColumnsSuccess,
  getColumnsFailure,
  setColumns,
  createTaskSuccess,
  createColumnFailure,
  deleteColumnSuccess,
  deleteColumnFailure,
  editColumnSuccess,
  editColumnFailure,
  createTaskFailure,
  editTaskSuccess,
  editTaskFailure,
  createColumnSuccess,
} from './tasks.slice';
import { columnsFromBackend } from './initial-data';

function* workGetColumns() {
  try {
    yield delay(SERVER_DELAY);
    yield put(setColumns(columnsFromBackend));
    yield put(getColumnsSuccess());
  } catch {
    yield put(getColumnsFailure());
  }
}

function* workCreateColumn() {
  try {
    yield delay(SERVER_DELAY);
    const { newColumnTitle, columns } = yield select(
      (state: RootState) => state.tasks
    );
    const newColumn: TColumn = {
      title: newColumnTitle,
      items: [],
    };
    const key = String(Date.now());

    yield put(setColumns({ ...columns, [key]: newColumn }));

    yield put(createColumnSuccess());
  } catch {
    yield put(createColumnFailure());
  }
}

function* workDeleteColumn() {
  try {
    yield delay(SERVER_DELAY);
    const { columns, deletingColumnId } = yield select(
      (state: RootState) => state.tasks
    );
    const newColumns: TColumnList = {};
    Object.entries(columns).forEach(([key, column]) => {
      if (key !== deletingColumnId) {
        Object.assign(newColumns, { [key]: column });
      }
    });
    yield put(setColumns(newColumns));
    yield put(deleteColumnSuccess());
  } catch {
    yield put(deleteColumnFailure());
  }
}

function* workEditColumn() {
  try {
    yield delay(SERVER_DELAY);
    const { editedColumnId, columns, editedColumnTitle } = yield select(
      (state: RootState) => state.tasks
    );

    const newColumns = { ...columns };
    newColumns[editedColumnId] = {
      ...newColumns[editedColumnId],
      title: editedColumnTitle,
    };

    yield put(setColumns(newColumns));

    yield put(editColumnSuccess());
  } catch {
    yield put(editColumnFailure());
  }
}

function* workCreateTask() {
  try {
    yield delay(SERVER_DELAY);

    const { newTaskTitle, newTaskDescription, newTaskColumnId, columns } =
      yield select((state: RootState) => state.tasks);

    const newColumns: TColumnList = {};

    const newTask = {
      title: newTaskTitle,
      content: newTaskDescription,
      key: String(Date.now()),
    };

    Object.entries(columns).map(([key, column]) => {
      const tColumn = column as TColumn;
      const lColumn = { ...tColumn };
      if (key === newTaskColumnId) {
        lColumn.items = [...lColumn.items, newTask];
      }
      newColumns[key] = { ...lColumn };
    });

    yield put(setColumns(newColumns));
    yield put(createTaskSuccess());
  } catch {
    yield put(createTaskFailure());
  }
}

function* workEditTask() {
  try {
    yield delay(SERVER_DELAY);
    const {
      editedTaskTitle,
      editedTaskDescription,
      editedTaskId,
      editedTaskColumnId,
      columns,
    } = yield select((state: RootState) => state.tasks);

    const newTask = {
      title: editedTaskTitle,
      content: editedTaskDescription,
      key: editedTaskId,
    };

    const newColumns: TColumnList = {};
    Object.entries(columns).map(([key, column]) => {
      const tColumn = column as TColumn;
      const lColumn = { ...tColumn };
      if (key === editedTaskColumnId) {
        const index = lColumn.items.findIndex((task) => {
          return task.key === editedTaskId;
        });
        const items = [...lColumn.items];
        items[index] = newTask;
        lColumn.items = items;
      }
      newColumns[key] = { ...lColumn };
    });

    yield put(setColumns(newColumns));

    yield put(editTaskSuccess());
  } catch {
    yield put(editTaskFailure());
  }
}

function* workDeleteTask() {
  try {
    yield delay(SERVER_DELAY);

    const { deletingTaskColumnId, deletingTaskId, columns } = yield select(
      (state: RootState) => state.tasks
    );

    const newColumns: TColumnList = {};

    Object.entries(columns).map(([key, column]) => {
      const tColumn = column as TColumn;
      const lColumn = { ...tColumn };
      if (key === deletingTaskColumnId) {
        const index = lColumn.items.findIndex((task) => {
          return task.key === deletingTaskId;
        });
        const items = [...lColumn.items];
        items.splice(index, 1);
        lColumn.items = items;
      }
      newColumns[key] = { ...lColumn };
    });

    yield put(setColumns(newColumns));
    yield put(editTaskSuccess());
  } catch {
    yield put(editTaskFailure());
  }
}

function* tasksSaga() {
  yield takeEvery('tasks/getColumns', workGetColumns);
  yield takeEvery('tasks/createColumn', workCreateColumn);
  yield takeEvery('tasks/deleteColumn', workDeleteColumn);
  yield takeEvery('tasks/editColumn', workEditColumn);
  yield takeEvery('tasks/createTask', workCreateTask);
  yield takeEvery('tasks/editTask', workEditTask);
  yield takeEvery('tasks/deleteTask', workDeleteTask);
}

export default tasksSaga;
