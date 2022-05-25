import { Button, CircularProgress, Input, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';

import { Column } from '../../components';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ICreateColumn } from '../../store/tasks/tasks.interface';
import {
  createColumn,
  getColumns,
  setColumns,
} from '../../store/tasks/tasks.slice';

import styles from './HomePage.module.css';

const onDragEnd = (
  result: DropResult,
  columns: TColumnList,
  setColumns: (columns: TColumnList) => void
) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

export const HomePage = () => {
  const { columns, isDataLoading, isColumnCreating } = useAppSelector(
    (state) => state.tasks
  );
  const [isCreatingColumn, setIsCreatingColumn] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateColumn>();

  useEffect(() => {
    dispatch(getColumns());
  }, [dispatch]);

  const onSubmit = (formData: ICreateColumn) => {
    dispatch(createColumn(formData.title));
    setIsCreatingColumn(false);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h2" className={styles.title}>
        Kanban Board
      </Typography>
      {isDataLoading ? (
        <Box className={styles.loader}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DragDropContext
            onDragEnd={(result: DropResult) =>
              onDragEnd(result, columns, (columns) =>
                dispatch(setColumns(columns))
              )
            }
          >
            <Box className={styles.container}>
              {Object.entries(columns).map(([columnId, column]) => (
                <Box className={styles.column}>
                  <Column key={columnId} columnId={columnId} column={column} />
                </Box>
              ))}
              <Box className={styles.column} sx={{ paddingTop: 8 }}>
                {isCreatingColumn ? (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.form}
                  >
                    <Input
                      {...register('title', {
                        required: { value: true, message: 'Title is Required' },
                        pattern: {
                          value: /^[0-9a-zA-Z ]+$/,
                          message: 'You only can use Aa-Za & 0-9',
                        },
                      })}
                      placeholder="Card Title"
                      defaultValue=""
                      className={styles.input}
                    />
                    {errors.title && (
                      <span className={styles.error}>
                        {errors.title.message}
                      </span>
                    )}
                    <Button
                      variant="contained"
                      onClick={handleSubmit(onSubmit)}
                    >
                      submit
                    </Button>
                    <Button
                      className={styles.cancel}
                      variant="outlined"
                      onClick={() => setIsCreatingColumn(false)}
                    >
                      cancel
                    </Button>
                  </form>
                ) : (
                  <Button
                    variant="contained"
                    disabled={isColumnCreating}
                    className={styles.create}
                    onClick={() => setIsCreatingColumn(true)}
                  >
                    {isColumnCreating ? 'Creating...' : 'Create Column'}
                  </Button>
                )}
              </Box>
            </Box>
          </DragDropContext>
        </>
      )}
    </Container>
  );
};
