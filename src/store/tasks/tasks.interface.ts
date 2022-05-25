export interface ICreateColumn {
  title: string;
}

export interface IEditColumn {
  title: string;
  id: string;
}

export interface ICreateTask {
  title: string;
  description: string;
  columnId: string;
}

export interface IEditTask extends ICreateTask {
  taskId: string;
}

export interface IDeleteTask {
  taskId: string;
  columnId: string;
}
