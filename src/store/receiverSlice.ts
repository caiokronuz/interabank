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

const receiverSlice = createSlice({
  name: 'receiver',
  initialState,
  reducers: {
    setReceiver: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setReceiver } = receiverSlice.actions;
export default receiverSlice.reducer;
