import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface WorkoutState {
  data: WorkoutResponse;
}

const initialState: WorkoutState = {
  data: { count: 0, rows: [] },
};

export const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    initData: (state, action: PayloadAction<WorkoutResponse>) => {
      if (action.payload) {
        console.log('\x1b[32m%s\x1b[0m', '[INIT] Workouts');
        state.data = action.payload;
      }
    },
  },
});

export const { initData } = workoutSlice.actions;

export default workoutSlice.reducer;
