import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

import axios from '../../lib/axios';

const createAppSlice = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const favoritesSlice = createAppSlice({
  name: 'favorites',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: (create) => ({
    fetchFavorites: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const response = await axios.get('/favorites', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('default_access_token')}`,
            },
          });
          return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state, action) => {
          state.data = action.payload;
        },
        rejected: (state, action) => {
          state.error = action.payload ?? action.error;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    addFavorite: create.asyncThunk(
      async (data, thunkAPI) => {
        try {
          const response = await axios.post('/favorites', data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('default_access_token')}`,
            },
          });
          return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state, action) => {
          state.data.push(action.payload);
        },
        rejected: (state, action) => {
          state.error = action.payload ?? action.error;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
    deleteFavorite: create.asyncThunk(
      async (id, thunkAPI) => {
        try {
          await axios.delete(`/favorites/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('default_access_token')}`,
            },
          });
          return thunkAPI.fulfillWithValue(id);
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        fulfilled: (state, action) => {
          state.data = state.data.filter((favorite) => favorite.id !== action.payload);
        },
        rejected: (state, action) => {
          state.error = action.payload ?? action.error;
        },
        settled: (state) => {
          state.loading = false;
        },
      }
    ),
  }),
});

export const { fetchFavorites, addFavorite, deleteFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
