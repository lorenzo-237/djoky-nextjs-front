import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: CategoryResponse = {
  count: 0,
  rows: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<CategoryResponse>) => {
      console.log('init category');
      return action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.count++;
      state.rows.push(action.payload);
    },
  },
});

export const { init, addCategory } = categorySlice.actions;

export default categorySlice.reducer;
