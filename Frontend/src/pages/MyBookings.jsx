import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Footer from '../components/Footer.jsx'
import BookingCard from '../components/BookingCard.jsx'
import { selectAllBookings } from '../redux/slices/bookingsSlice.js'
import { selectUser, selectIsAuthenticated } from '../redux/slices/authSlice.js'

const MyBookings = () => {
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const allBookings = useSelector(selectAllBookings)
  const navigate = useNavigate()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  // Filter bookings for current user
  const userBookings = allBookings.filter(booking => 
    booking.userName === user?.name
  )

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">My Bookings</h2>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}! Here are your current bookings.</p>
        </div>

        {userBookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">You haven't made any bookings yet.</p>
            <button
              onClick={() => navigate('/resources')}
              className="mt-4 inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              Browse Resources
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default MyBookings 