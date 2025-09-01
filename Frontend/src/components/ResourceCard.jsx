// src/components/ResourceCard.jsx
import { useNavigate } from 'react-router-dom'

export default function ResourceCard({ resource }) {
  const navigate = useNavigate()

  const handleBookNow = () => {
    // Navigate to bookings page with the selected resource
    navigate('/bookings', { 
      state: { 
        selectedResource: resource,
        showForm: true 
      } 
    })
  }

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold">{resource.name}</h2>
      <p className="text-gray-600">{resource.description}</p>
      <p className="mt-2 font-bold">₹{resource.rate}/day</p>
      <button 
        onClick={handleBookNow}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
      >
        Book Now
      </button>
    </div>
  );
}
  