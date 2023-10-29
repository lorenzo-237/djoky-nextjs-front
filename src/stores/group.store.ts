import { create } from 'zustand';
import { combine } from 'zustand/middleware';

type UpdateGroupDto = {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
};

type RefreshCategoryDto = {
  categoryId: number;
  categoryName: string;
};

export interface GroupState {
  response: GroupResponse;
  currentUpdate: UpdateGroupDto;
}

const emptyCurrentUpdate = {
  id: 0,
  name: '',
  category: {
    id: 0,
    name: '',
  },
};

const initialState: GroupState = {
  response: { count: 0, rows: [] },
  currentUpdate: emptyCurrentUpdate,
};

const useGroupStore = create(
  combine(initialState, (set) => ({
    initData: (payload: GroupResponse) => set(() => ({ response: payload })),

    setCurrentUpdate: (dto: UpdateGroupDto) => set(() => ({ currentUpdate: dto })),

    validate: (groupId: number) =>
      set((state) => ({
        response: {
          ...state.response,
          rows: state.response.rows.map((group) => (group.id === groupId ? { ...group, isPending: false } : group)),
        },
      })),

    pending: (groupId: number) =>
      set((state) => ({
        response: {
          ...state.response,
          rows: state.response.rows.map((group) => (group.id === groupId ? { ...group, isPending: true } : group)),
        },
      })),

    add: (group: Group) =>
      set((state) => ({
        response: {
          count: state.response.count + 1,
          rows: [...state.response.rows, group],
        },
      })),

    update: ({ id, name, category }: UpdateGroupDto) =>
      set((state) => ({
        response: {
          ...state.response,
          rows: state.response.rows.map((group) => (group.id === id ? { ...group, name, category } : group)),
        },
        currentUpdate: emptyCurrentUpdate,
      })),
    refreshCategory: ({ categoryId, categoryName }: RefreshCategoryDto) =>
      set((state) => ({
        response: {
          ...state.response,
          rows: state.response.rows.map((group) =>
            group.category.id === categoryId
              ? {
                  ...group,
                  category: {
                    ...group.category,
                    name: categoryName,
                  },
                }
              : group
          ),
        },
      })),
  }))
);

export default useGroupStore;
