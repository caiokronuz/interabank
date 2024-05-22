import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

const booleanSlice = createSlice({
  name: 'boolean',
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value
    }
  },
})

export const { toggle } = booleanSlice.actions

export default booleanSlice.reducer
