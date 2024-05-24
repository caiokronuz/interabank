import { configureStore } from '@reduxjs/toolkit'

import booleanSlice from './booleanSlice'
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        boolean: booleanSlice,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch