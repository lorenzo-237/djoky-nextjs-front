import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UpdateDto {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
}

export interface GroupState {
  data: GroupResponse;
  currentUpdate: UpdateDto;
}

const initialState: GroupState = {
  data: { count: 0, rows: [] },
  currentUpdate: {
    id: 0,
    name: '',
    category: {
      id: 0,
      name: '',
    },
  },
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    initData: (state, action: PayloadAction<GroupResponse>) => {
      if (action.payload) {
        console.log('\x1b[32m%s\x1b[0m', '[INIT] Groups');
        state.data = action.payload;
      }
    },
    addGroup: (state, action: PayloadAction<Group>) => {
      state.data.count++;
      state.data.rows.push(action.payload);
    },
    setCurrentUpdate: (state, action: PayloadAction<UpdateDto>) => {
      state.currentUpdate = action.payload;
    },
    update: (state, action: PayloadAction<UpdateDto>) => {
      const { id, name, category } = action.payload;

      state.data.rows = state.data.rows.map((group) =>
        group.id === id
          ? {
              ...group,
              name,
              category: {
                id: category.id,
                name: category.name,
              },
            }
          : group
      );

      state.currentUpdate = {
        id: 0,
        name: '',
        category: {
          id: 0,
          name: '',
        },
      };
    },
    validate: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.data.rows = state.data.rows.map((group) => (group.id === id ? { ...group, isPending: false } : group));
    },
    pending: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.data.rows = state.data.rows.map((group) => (group.id === id ? { ...group, isPending: true } : group));
    },
    udpdateCategory: (state, action: PayloadAction<{ categoryId: number; categoryName: string }>) => {
      const { categoryId, categoryName } = action.payload;

      state.data.rows = state.data.rows.map((group) =>
        group.category.id === categoryId
          ? {
              ...group,
              category: {
                ...group.category,
                name: categoryName,
              },
            }
          : group
      );
    },
  },
});

export const { initData, addGroup, setCurrentUpdate, update, validate, pending, udpdateCategory } = groupSlice.actions;

export default groupSlice.reducer;
