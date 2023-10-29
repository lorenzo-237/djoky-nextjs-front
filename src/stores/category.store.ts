import { create } from 'zustand';
import { combine } from 'zustand/middleware';

type UpdateCategoryDto = { id: number; name: string };

export interface CategoryState {
  response: CategoryResponse;
  currentUpdate: UpdateCategoryDto;
}

const initialState: CategoryState = {
  currentUpdate: { id: 0, name: '' },
  response: { count: 0, rows: [] },
};

const useCategoryStore = create(
  combine(initialState, (set) => ({
    initData: (payload: CategoryResponse) => set((state) => ({ ...state, response: payload })),
    setCurrentUpdate: (dto: UpdateCategoryDto) => set((state) => ({ ...state, currentUpdate: dto })),
  }))
);

export default useCategoryStore;
