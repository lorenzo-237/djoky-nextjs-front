type Role = 'USER' | 'MANAGER' | 'ADMIN';
type User = {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: Role;
};

type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdUserId: number;
  isPending: boolean;
};

type CategoryResponse = {
  count: number;
  rows: Category[];
};

type Group = {
  id: number;
  name: string;
  isPending: boolean;
  createdAt: string;
  updatedAt: string;
  createdUserId: number;
  category: {
    id: number;
    name: string;
  };
  exercisesCount: number;
};

type GroupResponse = {
  count: number;
  rows: Group[];
};

type Exercise = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdUserId: number;
  isPending: boolean;
  timed: boolean;
  group: {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
    };
  };
};

type ExerciseResponse = {
  count: number;
  rows: Exercise[];
};

type WorkoutExercise = {
  id: number;
  name: string;
  description: string;
  timed: boolean;
  group: {
    id: number;
    name: string;
    category: {
      id: number;
      name: string;
    };
  };
  assignedAt: string;
  series: number;
  repetitions: number;
  time: number;
  weight: number;
  total: number;
};

type Workout = {
  id: number;
  date: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isDeleted: boolean;
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
  exercises: WorkoutExercise[];
};

type WorkoutResponse = {
  page: number;
  pageSize: number;
  totalPage: number;
  count: number;
  rows: Workout[];
};
