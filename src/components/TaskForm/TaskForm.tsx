import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
} from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { useAppDispatch } from '../../store/hooks';
import { createTask, editTask } from '../../store/tasks/tasks.slice';
import { IEditTask } from '../../store/tasks/tasks.interface';

import { TaskFormProps } from './TaskForm.props';
import styles from './TaskForm.module.css';

export const TaskForm: FC<TaskFormProps> = ({
  task,
  closeHandler,
  columnId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditTask>();

  const dispatch = useAppDispatch();

  const onSubmit = (formData: IEditTask) => {
    const data = {
      ...formData,
      columnId,
    };
    dispatch(task ? editTask({ ...data, taskId: task.key }) : createTask(data));
    closeHandler();
  };

  return (
    <>
      <DialogTitle>{task ? 'Edit' : 'Create'} Task</DialogTitle>
      <DialogContent>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Task Title"
            {...register('title', {
              required: { value: true, message: 'Title is required' },
              pattern: {
                value: /^[0-9a-zA-Z ]+$/,
                message: 'You only can use Aa-Za & 0-9 in task title',
              },
            })}
            defaultValue={task ? task.title : ''}
          />
          {errors.title && <span>{errors.title.message}</span>}
          <TextField
            multiline
            placeholder="Task Description"
            {...register('description')}
            defaultValue={task ? task.content : ''}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
        <Button variant="outlined" onClick={closeHandler}>
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};
