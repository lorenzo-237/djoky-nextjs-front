import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UpdateDto {
  id: number;
  name: string;
  categoryId: number;
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
    categoryId: 0,
  },
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    initData: (state, action: PayloadAction<GroupResponse>) => {
      console.log('init data group');
      state.data = action.payload;
    },
    addGroup: (state, action: PayloadAction<Group>) => {
      console.log('add group');
      state.data.count++;
      state.data.rows.push(action.payload);
    },
    setCurrentUpdate: (state, action: PayloadAction<UpdateDto>) => {
      console.log(`set current group [${action.payload.id}:${action.payload.name}]`);
      state.currentUpdate = action.payload;
    },
    update: (state, action: PayloadAction<{ id: number; name: string; categoryId: number }>) => {
      console.log('update group');
      const { id, name, categoryId } = action.payload;

      state.data.rows = state.data.rows.map((group) =>
        group.id === id
          ? {
              ...group,
              ...{
                name,
                category: {
                  id: categoryId,
                  name: group.category.name,
                },
              },
            }
          : group
      );

      state.currentUpdate = {
        id: 0,
        name: '',
        categoryId: 0,
      };
    },
    validate: (state, action: PayloadAction<number>) => {
      console.log('validate group');
      const id = action.payload;

      state.data.rows = state.data.rows.map((group) => (group.id === id ? { ...group, isPending: false } : group));
    },
    pending: (state, action: PayloadAction<number>) => {
      console.log('pending group');
      const id = action.payload;

      state.data.rows = state.data.rows.map((group) => (group.id === id ? { ...group, isPending: true } : group));
    },
  },
});

export const { initData, addGroup, setCurrentUpdate, update, validate, pending } = groupSlice.actions;

export default groupSlice.reducer;
