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
    initData: (payload: CategoryResponse) => set(() => ({ response: payload })),
    setCurrentUpdate: (dto: UpdateCategoryDto) => set(() => ({ currentUpdate: dto })),
    validate: (categoryId: number) =>
      set((state) => ({
        response: {
          ...state.response,
          rows: state.response.rows.map((category) =>
            category.id === categoryId ? { ...category, isPending: false } : category
          ),
        },
      })),
    pending: (categoryId: number) =>
      set((state) => ({
        response: {
          ...state.response,
          rows: state.response.rows.map((category) =>
            category.id === categoryId ? { ...category, isPending: true } : category
          ),
        },
      })),
    add: (category: Category) =>
      set((state) => ({
        response: {
          count: state.response.count + 1,
          rows: [...state.response.rows, category],
        },
      })),
    update: ({ id, name }: UpdateCategoryDto) =>
      set((state) => ({
        response: {
          ...state.response,
          rows: state.response.rows.map((category) => (category.id === id ? { ...category, name } : category)),
        },
        currentUpdate: {
          id: 0,
          name: '',
        },
      })),
  }))
);

export default useCategoryStore;
