import { configureStore } from '@reduxjs/toolkit'
import UserSlicer from './slicers/User'

export const store = configureStore({
  reducer: {
    user:UserSlicer
  },
})