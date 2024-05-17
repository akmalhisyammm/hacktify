import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL } from '../../constants/url';

const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    fetchFavoritesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchFavoritesSuccess(state, action) {
      state.favorites = action.payload;
      state.loading = false;
    },
    fetchFavoritesFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchFavoritesStart, fetchFavoritesSuccess, fetchFavoritesFailure } =
  favoritesSlice.actions;

export const fetchFavorites = () => async (dispatch) => {
  try {
    dispatch(fetchFavoritesStart());

    const response = await axios.get(`${API_URL}/favorites`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('default_access_token')}`,
      },
    });

    dispatch(fetchFavoritesSuccess(response.data));
  } catch (error) {
    dispatch(fetchFavoritesFailure(error.toString()));
  }
};

export default favoritesSlice.reducer;
