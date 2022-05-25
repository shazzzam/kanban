import { FC, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Input,
  Typography,
} from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

import { TaskForm, Task } from '..';

import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteColumn, editColumn } from '../../store/tasks/tasks.slice';
import { ICreateColumn } from '../../store/tasks/tasks.interface';

import { ColumnProps } from './Column.props';
import styles from './Columns.module.css';

export const Column: FC<ColumnProps> = ({ columnId, column }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isTaskAdding, setIsTaskAdding] = useState<boolean>(false);
  const {
    isColumnEditing,
    isColumnDeleting,
    deletingColumnId,
    editedColumnId,
    isTaskCreating,
    newTaskColumnId,
  } = useAppSelector((state: RootState) => state.tasks);

  const isCurrentEditing = isColumnEditing && editedColumnId === columnId;
  const isCurrentDeleting = isColumnDeleting && deletingColumnId === columnId;

  const isDisabled = isCurrentEditing || isCurrentDeleting;
  const isAddingDisabled = isTaskCreating && newTaskColumnId === columnId;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateColumn>();

  const onSubmit = (formData: ICreateColumn) => {
    dispatch(editColumn({ title: formData.title, id: columnId }));
    setIsEditing(false);
  };

  return (
    <>
      <Box className={styles.column} key={columnId}>
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
              {...register('title', {
                required: { value: true, message: 'Title is Required' },
                pattern: {
                  value: /^[0-9a-zA-Z ]+$/,
                  message: 'You only can use Aa-Za & 0-9',
                },
              })}
              placeholder="Card Title"
              defaultValue={column.title}
              className={styles.input}
            />
            {errors.title && (
              <span className={styles.error}>{errors.title.message}</span>
            )}
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              submit
            </Button>
            <Button
              className={styles.cancel}
              variant="outlined"
              onClick={() => setIsEditing(false)}
            >
              cancel
            </Button>
          </form>
        ) : (
          <Box className={styles.titlebox}>
            <Typography variant="h4">{column.title}</Typography>
            {isDisabled ? (
              <Box className={styles.titleloader}>
                <CircularProgress />
              </Box>
            ) : (
              <Box className={styles.titlebtns}>
                <IconButton
                  disabled={isDisabled}
                  size="small"
                  onClick={() => dispatch(deleteColumn(columnId))}
                >
                  <DeleteOutline />
                </IconButton>
                <IconButton
                  disabled={isDisabled}
                  onClick={() => setIsEditing(true)}
                >
                  <EditOutlined />
                </IconButton>
              </Box>
            )}
          </Box>
        )}
        <div style={{ margin: 8 }}>
          <Droppable droppableId={columnId} key={columnId}>
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver
                      ? 'lightblue'
                      : 'lightgrey',
                    padding: 8,
                    width: 250,
                    minHeight: 150,
                  }}
                >
                  {column.items.map((task, index) => (
                    <Task
                      key={task.key}
                      task={task}
                      index={index}
                      columnId={columnId}
                    />
                  ))}
                  {provided.placeholder}
                  <Button
                    variant="contained"
                    disabled={isAddingDisabled}
                    onClick={() => setIsTaskAdding(true)}
                  >
                    {isAddingDisabled ? 'Task adding...' : 'Add Task'}
                  </Button>
                </div>
              );
            }}
          </Droppable>
        </div>
      </Box>
      <Dialog open={isTaskAdding} onClose={() => setIsTaskAdding(false)}>
        <TaskForm
          closeHandler={() => setIsTaskAdding(false)}
          columnId={columnId}
        />
      </Dialog>
    </>
  );
};
