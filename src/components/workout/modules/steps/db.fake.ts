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

export const fakeExercises: Exercise[] = [
  {
    id: 1,
    name: 'Exercise 1',
    description: 'This is exercise 1',
    createdAt: '2023-10-18',
    updatedAt: '2023-10-18',
    createdUserId: 1,
    isPending: false,
    timed: true,
    group: {
      id: 1,
      name: 'Group A',
      category: {
        id: 101,
        name: 'Category X',
      },
    },
  },
  {
    id: 2,
    name: 'Exercise 2',
    description: 'This is exercise 2',
    createdAt: '2023-10-19',
    updatedAt: '2023-10-19',
    createdUserId: 2,
    isPending: true,
    timed: false,
    group: {
      id: 2,
      name: 'Group B',
      category: {
        id: 102,
        name: 'Category Y',
      },
    },
  },
  {
    id: 3,
    name: 'Exercise 3',
    description: 'This is exercise 2',
    createdAt: '2023-10-19',
    updatedAt: '2023-10-19',
    createdUserId: 2,
    isPending: true,
    timed: false,
    group: {
      id: 2,
      name: 'Group B',
      category: {
        id: 102,
        name: 'Category Y',
      },
    },
  },
  {
    id: 4,
    name: 'Exercise 4',
    description: 'This is exercise 2',
    createdAt: '2023-10-19',
    updatedAt: '2023-10-19',
    createdUserId: 2,
    isPending: true,
    timed: false,
    group: {
      id: 2,
      name: 'Group B',
      category: {
        id: 102,
        name: 'Category Y',
      },
    },
  },
  // Vous pouvez ajouter d'autres exercices au tableau si nécessaire
];
