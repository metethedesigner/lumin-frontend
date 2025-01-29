import { configureStore } from '@reduxjs/toolkit';
import reservationsReducer from '../features/reservationsSlice';
import usersReducer from '../features/usersSlice';

export const store = configureStore({
  reducer: {
    reservations: reservationsReducer,
    users: usersReducer
  },
});

// RootState ve AppDispatch tiplerini export edin
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;