import { configureStore } from '@reduxjs/toolkit'
import booleanSlice from './booleanSlice'

export const store = configureStore({
    reducer: {
        boolean: booleanSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch