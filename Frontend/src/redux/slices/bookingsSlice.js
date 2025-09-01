import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bookings: [
    {
      id: 1,
      resourceId: 1,
      resourceName: "Tractor",
      userName: "John Doe",
      date: "2024-01-15",
      notes: "Need for field preparation",
      status: "Confirmed"
    },
    {
      id: 2,
      resourceId: 3,
      resourceName: "Labor Team",
      userName: "Jane Smith",
      date: "2024-01-20",
      notes: "Harvesting assistance required",
      status: "Pending"
    }
  ],
  loading: false,
  error: null
}

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action) => {
      const newBooking = {
        ...action.payload,
        id: Date.now(),
        status: "Pending"
      }
      state.bookings.push(newBooking)
    },
    updateBooking: (state, action) => {
      const { id, updates } = action.payload
      const bookingIndex = state.bookings.findIndex(booking => booking.id === id)
      if (bookingIndex !== -1) {
        state.bookings[bookingIndex] = { ...state.bookings[bookingIndex], ...updates }
      }
    },
    deleteBooking: (state, action) => {
      state.bookings = state.bookings.filter(booking => booking.id !== action.payload)
    },
    setBookings: (state, action) => {
      state.bookings = action.payload
    }
  }
})

export const { addBooking, updateBooking, deleteBooking, setBookings } = bookingsSlice.actions
export default bookingsSlice.reducer

// Selectors
export const selectAllBookings = (state) => state.bookings.bookings
export const selectBookingById = (state, bookingId) => 
  state.bookings.bookings.find(booking => booking.id === bookingId)
export const selectBookingsByStatus = (state, status) =>
  state.bookings.bookings.filter(booking => booking.status === status) 