import { CircularProgress, Dialog, IconButton, Paper } from '@mui/material';
import { FC, useState, MouseEvent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { DeleteOutline } from '@mui/icons-material';
import cn from 'classnames';
import { Box } from '@mui/system';

import { TaskForm } from '..';

import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteTask } from '../../store/tasks/tasks.slice';

import { TaskProps } from './Task.props';
import styles from './Task.module.css';

export const Task: FC<TaskProps> = ({ task, index, columnId }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isTaskDeleting, deletingTaskId, isTaskEditing, editedTaskId } =
    useAppSelector((state: RootState) => state.tasks);

  const isLocalEditing = isTaskEditing && task.key === editedTaskId;
  const isLocalDeleting = isTaskDeleting && task.key === deletingTaskId;
  const isDisabled = isLocalEditing || isLocalDeleting;

  const deleteHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(
      deleteTask({
        taskId: task.key,
        columnId: columnId,
      })
    );
  };

  return (
    <>
      {isDisabled ? (
        <Paper className={cn(styles.container, styles.loading)}>
          <h4>{task.title}</h4>
          <p>{task.content}</p>
          <Box className={styles.loader}>
            <CircularProgress />
          </Box>
        </Paper>
      ) : (
        <Draggable key={task.key} draggableId={task.key} index={index}>
          {(provided, snapshot) => {
            return (
              <Paper
                onClick={() => setIsEditing(true)}
                className={cn(styles.container, {
                  [styles.dragging]: snapshot.isDragging,
                })}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                }}
              >
                <h4>{task.title}</h4>
                <p>{task.content}</p>
                <Box className={styles.delete}>
                  <IconButton size="small" onClick={deleteHandler}>
                    <DeleteOutline />
                  </IconButton>
                </Box>
              </Paper>
            );
          }}
        </Draggable>
      )}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <TaskForm
          closeHandler={() => setIsEditing(false)}
          columnId={columnId}
          task={task}
        />
      </Dialog>
    </>
  );
};
