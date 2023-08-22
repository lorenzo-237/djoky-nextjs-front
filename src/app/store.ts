import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './reducers/category.slice';
import groupReducer from './reducers/group.slice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    group: groupReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
