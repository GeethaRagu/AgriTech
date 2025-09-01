import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import { addResource } from '../redux/slices/resourcesSlice.js'
import { selectIsAdmin, selectIsAuthenticated } from '../redux/slices/authSlice.js'

const AddResource = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [rate, setRate] = useState('')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAdmin = useSelector(selectIsAdmin)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  // Redirect non-admin users
  useEffect(() => {
    if (isAuthenticated && !isAdmin) {
      navigate('/')
    } else if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, isAdmin, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newResource = {
      name,
      category,
      location,
      description,
      rate: parseInt(rate) || 0
    }
    
    dispatch(addResource(newResource))
    
    // Reset form
    setName('')
    setCategory('')
    setLocation('')
    setDescription('')
    setRate('')
    
    // Navigate to resources page
    navigate('/resources')
  }

  // Don't render if not admin
  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div>
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Add Resource</h2>
          <p className="text-gray-600 mt-2">Add new agricultural resources to the system</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rate (₹/day)</label>
            <input type="number" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" value={rate} onChange={(e) => setRate(e.target.value)} required />
          </div>
          <button className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600" type="submit">Save</button>
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default AddResource

