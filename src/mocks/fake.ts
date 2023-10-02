export const workout: Workout = {
  id: 1,
  date: '2023-07-15T21:18:07.000Z',
  description: 'workout cool 2',
  createdAt: '2023-07-15T23:21:47.528Z',
  updatedAt: '2023-07-15T23:21:47.528Z',
  deletedAt: '',
  isDeleted: false,
  user: {
    id: 2,
    firstname: 'Lorenzo',
    lastname: 'Dev',
  },
  exercises: [
    {
      id: 1,
      name: 'Example Exercise',
      description: 'This is an example exercise.',
      group: {
        id: 5,
        name: 'Super TEST',
        category: {
          id: 18,
          name: 'super catégorie',
        },
      },
    },
    {
      id: 2,
      name: 'Exercise dos',
      description: 'exercice pour le dos',
      group: {
        id: 5,
        name: 'Super TEST',
        category: {
          id: 18,
          name: 'super catégorie',
        },
      },
    },
  ],
};
