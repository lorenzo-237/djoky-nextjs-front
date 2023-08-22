import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UpdateDto {
  id: number;
  name: string;
}

export interface CategoryState {
  data: CategoryResponse;
  currentUpdate: UpdateDto;
}

const initialState: CategoryState = {
  data: { count: 0, rows: [] },
  currentUpdate: {
    id: 0,
    name: '',
  },
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    initData: (state, action: PayloadAction<CategoryResponse>) => {
      if (action.payload) {
        console.log('\x1b[32m%s\x1b[0m', '[INIT] Categories');
        state.data = action.payload;
      }
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.data.count++;
      state.data.rows.push(action.payload);
    },
    setCurrentUpdate: (state, action: PayloadAction<UpdateDto>) => {
      state.currentUpdate = action.payload;
    },
    update: (state, action: PayloadAction<{ id: number; name: string }>) => {
      const { id, name } = action.payload;

      state.data.rows = state.data.rows.map((category) => (category.id === id ? { ...category, name } : category));

      state.currentUpdate = {
        id: 0,
        name: '',
      };
    },
    validate: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.data.rows = state.data.rows.map((category) =>
        category.id === id ? { ...category, isPending: false } : category
      );
    },
    pending: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.data.rows = state.data.rows.map((category) =>
        category.id === id ? { ...category, isPending: true } : category
      );
    },
  },
});

export const { initData, addCategory, setCurrentUpdate, update, validate, pending } = categorySlice.actions;

export default categorySlice.reducer;
