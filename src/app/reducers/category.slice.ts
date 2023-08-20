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
      console.log('init data category');
      state.data = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      console.log('add category');
      state.data.count++;
      state.data.rows.push(action.payload);
    },
    setCurrentUpdate: (state, action: PayloadAction<UpdateDto>) => {
      console.log(`set current category [${action.payload.id}:${action.payload.name}]`);
      state.currentUpdate = action.payload;
    },
    update: (state, action: PayloadAction<{ id: number; name: string }>) => {
      console.log('update category');
      const { id, name } = action.payload;

      state.data.rows = state.data.rows.map((category) => (category.id === id ? { ...category, name } : category));

      state.currentUpdate = {
        id: 0,
        name: '',
      };
    },
  },
});

export const { initData, addCategory, setCurrentUpdate, update } = categorySlice.actions;

export default categorySlice.reducer;
