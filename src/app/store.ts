import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import methaneReducer from '../features/methane/methaneSlice';

export const store = configureStore({
  reducer: {
    methane: methaneReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
