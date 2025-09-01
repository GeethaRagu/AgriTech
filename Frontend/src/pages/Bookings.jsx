import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import BookingForm from '../components/BookingForm.jsx'
import BookingCard from '../components/BookingCard.jsx'
import { selectAllBookings } from '../redux/slices/bookingsSlice.js'

const Bookings = () => {
  const [showForm, setShowForm] = useState(false)
  const [selectedResource, setSelectedResource] = useState(null)
  const bookings = useSelector(selectAllBookings)
  const location = useLocation()

  // Check if user navigated from ResourceCard
  useEffect(() => {
    if (location.state?.showForm && location.state?.selectedResource) {
      setShowForm(true)
      setSelectedResource(location.state.selectedResource)
      // Clear the navigation state to prevent showing form on refresh
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  const handleCreate = () => {
    setShowForm(false)
    setSelectedResource(null)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setSelectedResource(null)
  }

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Bookings</h2>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            + Create New Booking
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {selectedResource ? `Book ${selectedResource.name}` : 'Create New Booking'}
              </h3>
              <BookingForm 
                onSubmit={handleCreate} 
                onClose={handleCloseForm}
                preSelectedResource={selectedResource}
              />
            </div>
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No bookings found. Create your first booking!</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Bookings

