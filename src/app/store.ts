import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import methaneReducer from '../features/methane/methaneSlice';
import countryReducer from '../features/countries/countrySlice';
import carbonmonoxideReducer from '../features/carbonmonoxide/carbonmonoxideSlice';
import countrycodeReducer from '../features/countries/countrycodeSlice';

export const store = configureStore({
  reducer: {
    methane: methaneReducer,
    carbonmonoxide: carbonmonoxideReducer,
    country: countryReducer,
    countryCode:countrycodeReducer
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
