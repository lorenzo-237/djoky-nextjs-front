import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export type UpdateExerciseDto = {
  id: number;
  name: string;
  description: string;
  timed: boolean;
  group: {
    id: number;
    name: string;
    category?: {
      id: number;
      name: string;
    };
  };
};

type RefreshGroupDto = {
  groupId: number;
  groupName: string;
};

export interface ExerciseState {
  response: ExerciseResponse;
  currentUpdate: UpdateExerciseDto;
}

const emptyCurrentUpdate: UpdateExerciseDto = {
  id: 0,
  name: '',
  description: '',
  timed: false,
  group: {
    id: 0,
    name: '',
    category: {
      id: 0,
      name: '',
    },
  },
};

const initialState: ExerciseState = {
  response: { count: 0, rows: [] },
  currentUpdate: emptyCurrentUpdate,
};

const useExerciseStore = create(
  combine(initialState, (set, get) => ({
    initData: (payload: ExerciseResponse) => set(() => ({ response: payload })),

    setCurrentUpdate: (dto: UpdateExerciseDto) => set(() => ({ currentUpdate: dto })),

    validate: (exerciseId: number) =>
      set((state) => ({
        response: {
          ...state.response,
          rows: state.response.rows.map((exercise) =>
            exercise.id === exerciseId ? { ...exercise, isPending: false } : exercise
          ),
        },
      })),

    pending: (exerciseId: number) =>
      set((state) => ({
        response: {
          ...state.response,
          rows: state.response.rows.map((exercise) =>
            exercise.id === exerciseId ? { ...exercise, isPending: true } : exercise
          ),
        },
      })),

    add: (exercise: Exercise) =>
      set((state) => ({
        response: {
          count: state.response.count + 1,
          rows: [...state.response.rows, exercise],
        },
      })),

    update: ({ id, name, description, timed, group }: UpdateExerciseDto) =>
      set((state) => ({
        response: {
          ...state.response,
          rows: state.response.rows.map((exercise) =>
            exercise.id === id
              ? {
                  ...exercise,
                  name,
                  description,
                  timed,
                  group: {
                    ...exercise.group,
                    id: group.id,
                    name: group.name,
                  },
                }
              : exercise
          ),
        },
        currentUpdate: emptyCurrentUpdate,
      })),
    refreshGroup: (dto: RefreshGroupDto) =>
      set((state) => ({
        response: {
          ...state.response,
          rows: state.response.rows.map((exercise) =>
            exercise.group.id === dto.groupId
              ? {
                  ...exercise,
                  group: {
                    ...exercise.group,
                    name: dto.groupName,
                  },
                }
              : exercise
          ),
        },
      })),
    getExercisesByGroup: (groupId: number) => {
      const exercises = get().response.rows;
      return exercises.filter((exercise) => exercise.group.id === groupId);
    },
  }))
);

export default useExerciseStore;
