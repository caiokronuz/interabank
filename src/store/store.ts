import { configureStore } from '@reduxjs/toolkit'

import booleanSlice from './booleanSlice'
import userSlice from './userSlice'

export const store = configureStore({
    reducer: {
        boolean: booleanSlice,
        user: userSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch