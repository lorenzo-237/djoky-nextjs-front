import { StateCreator } from 'zustand';

export interface CategorySlice {
  category: {
    response: CategoryResponse;
    currentUpdate: {
      id: 0;
      name: '';
    };
    initData: (payload: CategoryResponse) => void;
  };
}

export const createCategorySlice: StateCreator<CategorySlice> = (set) => ({
  category: {
    currentUpdate: { id: 0, name: '' },
    response: { count: 0, rows: [] },
    initData: (payload) => {
      set((state) => ({
        category: {
          ...state.category,
          response: payload,
        },
      }));
    },
  },
});
