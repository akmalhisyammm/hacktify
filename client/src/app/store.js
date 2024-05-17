import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer from '../features/favorites/favoritesSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    user: userReducer,
  },
});
