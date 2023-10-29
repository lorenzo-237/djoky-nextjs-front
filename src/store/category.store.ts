import { create } from 'zustand';
import { combine } from 'zustand/middleware';

interface CategoryState {
  data: CategoryResponse;
  currentUpdate: {
    id: 0;
    name: '';
  };
}

// currentUpdate: { id: 0, name: '' },
//   data: { count: 0, rows: [] },

const initialState: CategoryState = {
  currentUpdate: { id: 0, name: '' },
  data: { count: 0, rows: [] },
};

const useCategoryStore = create(
  combine(initialState, (set) => ({
    initData: (payload: CategoryResponse) => set((state) => ({ data: payload })),
  }))
);
