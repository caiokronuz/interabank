import { configureStore } from '@reduxjs/toolkit'

import booleanSlice from './booleanSlice'
import userSlice from './userSlice'
import receiverSlice from './receiverSlice'

export const store = configureStore({
    reducer: {
        boolean: booleanSlice,
        user: userSlice,
        receiver: receiverSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch