import { create, StateCreator } from 'zustand';

export interface CategorySlice {
  data: CategoryResponse;
  currentUpdate: {
    id: 0;
    name: '';
  };
  initData: (payload: CategoryResponse) => void;
}

// currentUpdate: { id: 0, name: '' },
//   data: { count: 0, rows: [] },

export const createCategorySlice: StateCreator<CategorySlice> = (set) => ({
  currentUpdate: { id: 0, name: '' },
  data: { count: 0, rows: [] },
  initData: (payload) => set(() => ({ data: payload })),
});

// export const createCategorySlice = create(
//   combine(initialState, (set) => ({
//     initData: (payload: CategoryResponse) => set(() => ({ data: payload })),
//   }))
// );
