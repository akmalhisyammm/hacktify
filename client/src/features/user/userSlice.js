import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

import axios from '../../lib/axios';

const createAppSlice = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const userSlice = createAppSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: (create) => ({
    fetchUser: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const response = await axios.get('/users/me', {
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
    updateUser: create.asyncThunk(
      async (data, thunkAPI) => {
        try {
          const response = await axios.put('/user', data, {
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
  }),
});

export const { fetchUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
