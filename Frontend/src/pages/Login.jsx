import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import { loginStart, loginSuccess, loginFailure, selectAuthError, selectAuthLoading, selectIsAuthenticated } from '../redux/slices/authSlice.js'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector(selectAuthError)
  const loading = useSelector(selectAuthLoading)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    dispatch(loginStart())
    
    // Mock authentication - in real app, this would be an API call
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user validation
      if (email === 'user@example.com' && password === 'password') {
        const user = {
          id: 1,
          name: 'John Doe',
          email: email,
          role: 'user'
        }
        dispatch(loginSuccess(user))
        navigate('/')
      } else if (email === 'admin@example.com' && password === 'admin123') {
        const user = {
          id: 2,
          name: 'Admin User',
          email: email,
          role: 'admin'
        }
        dispatch(loginSuccess(user))
        navigate('/')
      } else {
        dispatch(loginFailure('Invalid email or password'))
      }
    } catch {
      dispatch(loginFailure('Login failed. Please try again.'))
    }
  }

  return (
    <div>
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
          
          <button 
            className={`w-full inline-flex items-center justify-center rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-600 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 focus:ring-green-600'
            }`} 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Regular User:</strong><br />
              Email: user@example.com<br />
              Password: password
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-800">
              <strong>Admin User:</strong><br />
              Email: admin@example.com<br />
              Password: admin123
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Login

