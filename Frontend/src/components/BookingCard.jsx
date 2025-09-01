import { useDispatch, useSelector } from 'react-redux'
import { updateBooking } from '../redux/slices/bookingsSlice.js'
import { selectIsAdmin } from '../redux/slices/authSlice.js'

const BookingCard = ({ booking }) => {
  const dispatch = useDispatch()
  const isAdmin = useSelector(selectIsAdmin)

  const handleStatusChange = (newStatus) => {
    dispatch(updateBooking({ id: booking.id, updates: { status: newStatus } }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{booking.resourceName}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
          {booking.status}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-gray-600">
          <span className="font-medium">Booked by:</span> {booking.userName}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Date:</span> {new Date(booking.date).toLocaleDateString()}
        </p>
        {booking.notes && (
          <p className="text-gray-600">
            <span className="font-medium">Notes:</span> {booking.notes}
          </p>
        )}
      </div>

      {isAdmin && (
        <div className="flex gap-2">
          <select
            value={booking.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      )}
      
      {!isAdmin && (
        <div className="text-sm text-gray-500 italic">
          Only administrators can modify booking status
        </div>
      )}
    </div>
  )
}

export default BookingCard 