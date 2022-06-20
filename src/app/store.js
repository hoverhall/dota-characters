import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../features/profile/ProfileSlice';

export const store = configureStore({
  reducer: {
    profileName: profileReducer,
  },
});
