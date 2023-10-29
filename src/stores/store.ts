import { create } from 'zustand';
import { createCategorySlice, CategorySlice } from './category.slice';

export const useBoundStore = create<CategorySlice>()((...a) => ({
  ...createCategorySlice(...a),
}));
