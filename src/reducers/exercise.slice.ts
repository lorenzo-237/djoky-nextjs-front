import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UpdateDto {
  id: number;
  name: string;
  description: string;
  timed: boolean;
  group: {
    id: number;
    name: string;
    category?: {
      id: number;
      name: string;
    };
  };
}

export interface ExerciseState {
  data: ExerciseResponse;
  currentUpdate: UpdateDto;
}

const initialState: ExerciseState = {
  data: { count: 0, rows: [] },
  currentUpdate: {
    id: 0,
    name: '',
    description: '',
    timed: false,
    group: {
      id: 0,
      name: '',
      category: {
        id: 0,
        name: '',
      },
    },
  },
};

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    initData: (state, action: PayloadAction<ExerciseResponse>) => {
      if (action.payload) {
        console.log('\x1b[32m%s\x1b[0m', '[INIT] Exercises');
        state.data = action.payload;
      }
    },
    addExercise: (state, action: PayloadAction<Exercise>) => {
      state.data.count++;
      state.data.rows.push(action.payload);
    },
    setCurrentUpdate: (state, action: PayloadAction<UpdateDto>) => {
      state.currentUpdate = action.payload;
    },
    update: (state, action: PayloadAction<UpdateDto>) => {
      const { id, name, group, description, timed } = action.payload;

      state.data.rows = state.data.rows.map((exercise) =>
        exercise.id === id
          ? {
              ...exercise,
              name,
              description,
              timed,
              group: {
                ...exercise.group,
                id: group.id,
                name: group.name,
              },
            }
          : exercise
      );

      state.currentUpdate = {
        id: 0,
        name: '',
        description: '',
        timed: false,
        group: {
          id: 0,
          name: '',
          category: {
            id: 0,
            name: '',
          },
        },
      };
    },
    validate: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.data.rows = state.data.rows.map((exercise) =>
        exercise.id === id ? { ...exercise, isPending: false } : exercise
      );
    },
    pending: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.data.rows = state.data.rows.map((exercise) =>
        exercise.id === id ? { ...exercise, isPending: true } : exercise
      );
    },
    refreshGroup: (state, action: PayloadAction<{ groupId: number; groupName: string }>) => {
      const { groupId, groupName } = action.payload;

      state.data.rows = state.data.rows.map((exercise) =>
        exercise.group.id === groupId
          ? {
              ...exercise,
              group: {
                ...exercise.group,
                name: groupName,
              },
            }
          : exercise
      );
    },
  },
});

export const { initData, addExercise, setCurrentUpdate, update, validate, pending, refreshGroup } =
  exerciseSlice.actions;

export default exerciseSlice.reducer;
