// store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { UserProps } from '../utils/props';

const initialState: UserProps = {
  id: '',
  name: '',
  login: '',
  interas: 0,
  created: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
