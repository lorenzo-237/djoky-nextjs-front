export const fakeGroups: Group[] = [
  {
    id: 1,
    name: 'Group 1',
    isPending: true,
    createdAt: '2023-10-18',
    updatedAt: '2023-10-18',
    createdUserId: 1,
    category: {
      id: 1,
      name: 'Category A',
    },
  },
  {
    id: 2,
    name: 'Group 2',
    isPending: false,
    createdAt: '2023-10-19',
    updatedAt: '2023-10-19',
    createdUserId: 2,
    category: {
      id: 2,
      name: 'Category B',
    },
  },
  // Ajoutez d'autres éléments de groupe si nécessaire
];

export const fakeExercises: WorkoutExercise[] = [
  {
    id: 1,
    name: 'Exercise 1',
    description: 'Description for Exercise 1',
    timed: false,
    group: {
      id: 1,
      name: 'Group 1',
      category: {
        id: 1,
        name: 'Category 1',
      },
    },
    assignedAt: '2023-10-30',
    series: 3,
    repetitions: 12,
    time: 0,
    weight: 0,
    total: 0,
  },
  {
    id: 2,
    name: 'Exercise 2',
    description: 'Description for Exercise 2',
    timed: false,
    group: {
      id: 2,
      name: 'Group 2',
      category: {
        id: 1,
        name: 'Category 1',
      },
    },
    assignedAt: '2023-10-30',
    series: 4,
    repetitions: 10,
    time: 0,
    weight: 0,
    total: 0,
  },
  {
    id: 3,
    name: 'Exercise 3',
    description: 'Description for Exercise 3',
    timed: false,
    group: {
      id: 1,
      name: 'Group 1',
      category: {
        id: 2,
        name: 'Category 2',
      },
    },
    assignedAt: '2023-10-31',
    series: 3,
    repetitions: 8,
    time: 0,
    weight: 0,
    total: 0,
  },
  // Ajoutez d'autres exercices ici
];
