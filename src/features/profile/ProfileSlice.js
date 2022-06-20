import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from './ProfileAPI';

const initialState = {
  apiData: [],
  status: 'idle',
  searchData: ''
};

export const asyncData = createAsyncThunk(
    'profile/fetchData',
    async () => {
      const response = await fetchData();
      return response;
    }
  );

export const profileSlice = createSlice({
  name: 'profileName',
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(asyncData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.apiData = action.payload;
      });
  },
});

export const { setSearchData } = profileSlice.actions;
export const selectApi = (state) => state.profileName.apiData;
export const selectSearchData = (state) => state.profileName.searchData;


export default profileSlice.reducer;
