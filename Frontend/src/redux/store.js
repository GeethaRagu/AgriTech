import { configureStore } from '@reduxjs/toolkit'
import resourcesReducer from './slices/resourcesSlice'
import bookingsReducer from './slices/bookingsSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    resources: resourcesReducer,
    bookings: bookingsReducer,
    auth: authReducer,
  },
})

export default store 