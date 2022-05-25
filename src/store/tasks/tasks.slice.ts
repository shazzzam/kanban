import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ICreateTask,
  IDeleteTask,
  IEditColumn,
  IEditTask,
} from './tasks.interface';

export interface TasksState {
  columns: TColumnList;
  isDataLoading: boolean;
  isDataError: boolean;
  isColumnCreating: boolean;
  isColumnCreatingError: boolean;
  newColumnTitle: string;
  isColumnEditing: boolean;
  isColumnEditingError: boolean;
  editedColumnId: string;
  editedColumnTitle: string;
  isColumnDeleting: boolean;
  isColumnDeletingError: boolean;
  deletingColumnId: string;
  isTaskCreating: boolean;
  isTaskCreatingError: boolean;
  newTaskTitle: string;
  newTaskDescription: string;
  newTaskColumnId: string;
  isTaskForm: boolean;
  isTaskEditing: boolean;
  isTaskEditingError: boolean;
  editedTaskTitle: string;
  editedTaskDescription: string;
  editedTaskId: string;
  editedTaskColumnId: string;
  isTaskDeleting: boolean;
  isTaskDeletingError: boolean;
  deletingTaskId: string;
  deletingTaskColumnId: string;
}

const initialState: TasksState = {
  columns: {},
  isDataLoading: false,
  isDataError: false,
  isColumnCreating: false,
  isColumnCreatingError: false,
  newColumnTitle: '',
  isColumnEditing: false,
  isColumnEditingError: false,
  editedColumnTitle: '',
  editedColumnId: '',
  isColumnDeleting: false,
  isColumnDeletingError: false,
  deletingColumnId: '',
  isTaskCreating: false,
  isTaskCreatingError: false,
  newTaskTitle: '',
  newTaskDescription: '',
  newTaskColumnId: '',
  isTaskForm: false,
  isTaskEditing: false,
  isTaskEditingError: false,
  editedTaskTitle: '',
  editedTaskDescription: '',
  editedTaskId: '',
  editedTaskColumnId: '',
  isTaskDeleting: false,
  isTaskDeletingError: false,
  deletingTaskId: '',
  deletingTaskColumnId: '',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getColumns: (state: TasksState) => {
      state.isDataLoading = true;
      state.isDataError = false;
    },
    getColumnsSuccess: (state: TasksState) => {
      state.isDataLoading = false;
      state.isDataError = false;
    },
    getColumnsFailure: (state: TasksState) => {
      state.isDataLoading = false;
      state.isDataError = true;
    },
    setColumns: (state: TasksState, action: PayloadAction<TColumnList>) => {
      state.columns = action.payload;
    },
    createColumn: (state: TasksState, action: PayloadAction<string>) => {
      state.isColumnCreating = true;
      state.isColumnCreatingError = false;
      state.newColumnTitle = action.payload;
    },
    createColumnSuccess: (state: TasksState) => {
      state.isColumnCreating = false;
      state.isColumnCreatingError = false;
      state.newColumnTitle = '';
    },
    createColumnFailure: (state: TasksState) => {
      state.isColumnCreating = false;
      state.isColumnCreatingError = true;
      state.newColumnTitle = '';
    },
    editColumn: (state: TasksState, action: PayloadAction<IEditColumn>) => {
      state.isColumnEditing = true;
      state.isColumnEditingError = false;
      state.editedColumnTitle = action.payload.title;
      state.editedColumnId = action.payload.id;
    },
    editColumnSuccess: (state: TasksState) => {
      state.isColumnEditing = false;
      state.isColumnEditingError = false;
      state.editedColumnTitle = '';
      state.editedColumnId = '';
    },
    editColumnFailure: (state: TasksState) => {
      state.isColumnEditing = false;
      state.isColumnEditingError = true;
      state.editedColumnTitle = '';
      state.editedColumnId = '';
    },
    deleteColumn: (state: TasksState, action: PayloadAction<string>) => {
      state.isColumnDeleting = true;
      state.isColumnDeletingError = false;
      state.deletingColumnId = action.payload;
    },
    deleteColumnSuccess: (state: TasksState) => {
      state.isColumnDeleting = false;
      state.isColumnDeletingError = false;
      state.deletingColumnId = '';
    },
    deleteColumnFailure: (state: TasksState) => {
      state.isColumnDeleting = false;
      state.isColumnDeletingError = true;
      state.deletingColumnId = '';
    },
    createTask: (state: TasksState, action: PayloadAction<ICreateTask>) => {
      state.isTaskCreating = true;
      state.isTaskCreatingError = false;
      state.newTaskTitle = action.payload.title;
      state.newTaskDescription = action.payload.description;
      state.newTaskColumnId = action.payload.columnId;
    },
    createTaskSuccess: (state: TasksState) => {
      state.isTaskCreating = false;
      state.isTaskCreatingError = false;
      state.newTaskTitle = '';
      state.newTaskDescription = '';
      state.newTaskColumnId = '';
    },
    createTaskFailure: (state: TasksState) => {
      state.isTaskCreating = false;
      state.isTaskCreatingError = true;
      state.newTaskTitle = '';
      state.newTaskDescription = '';
      state.newTaskColumnId = '';
    },
    editTask: (state: TasksState, action: PayloadAction<IEditTask>) => {
      state.isTaskEditing = true;
      state.isTaskEditingError = false;
      state.editedTaskTitle = action.payload.title;
      state.editedTaskDescription = action.payload.description;
      state.editedTaskId = action.payload.taskId;
      state.editedTaskColumnId = action.payload.columnId;
    },
    editTaskSuccess: (state: TasksState) => {
      state.isTaskEditing = false;
      state.isTaskEditingError = false;
      state.editedTaskTitle = '';
      state.editedTaskDescription = '';
      state.editedTaskId = '';
      state.editedTaskColumnId = '';
    },
    editTaskFailure: (state: TasksState) => {
      state.isTaskEditing = false;
      state.isTaskEditingError = true;
      state.editedTaskTitle = '';
      state.editedTaskDescription = '';
      state.editedTaskId = '';
      state.editedTaskColumnId = '';
    },
    deleteTask: (state: TasksState, action: PayloadAction<IDeleteTask>) => {
      state.isTaskDeleting = true;
      state.isTaskDeletingError = false;
      state.deletingTaskId = action.payload.taskId;
      state.deletingTaskColumnId = action.payload.columnId;
    },
    deleteTaskSuccess: (state: TasksState) => {
      state.isTaskDeleting = false;
      state.isTaskDeletingError = false;
      state.deletingTaskId = '';
      state.deletingTaskColumnId = '';
    },
    deleteTaskFailure: (state: TasksState) => {
      state.isTaskDeleting = false;
      state.isTaskDeletingError = true;
      state.deletingTaskId = '';
      state.deletingTaskColumnId = '';
    },
  },
});

export const {
  getColumns,
  getColumnsSuccess,
  getColumnsFailure,
  setColumns,
  createColumn,
  createColumnSuccess,
  createColumnFailure,
  editColumn,
  editColumnSuccess,
  editColumnFailure,
  deleteColumn,
  deleteColumnSuccess,
  deleteColumnFailure,
  createTask,
  createTaskSuccess,
  createTaskFailure,
  editTask,
  editTaskSuccess,
  editTaskFailure,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskFailure,
} = tasksSlice.actions;

export default tasksSlice.reducer;
