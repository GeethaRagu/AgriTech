import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, selectIsAuthenticated, selectIsAdmin, logout } from '../redux/slices/authSlice.js'

const Navbar = () => {
  const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isAdmin = useSelector(selectIsAdmin)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-green-700">AgriTech</div>
        <ul className="flex gap-6 text-sm items-center">
          <li>
            <NavLink to="/" className={({ isActive }) => `hover:text-green-700 ${isActive ? 'text-green-700 font-semibold' : 'text-gray-700'}`}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/resources" className={({ isActive }) => `hover:text-green-700 ${isActive ? 'text-green-700 font-semibold' : 'text-gray-700'}`}>Resources</NavLink>
          </li>
          <li>
            <NavLink to="/bookings" className={({ isActive }) => `hover:text-green-700 ${isActive ? 'text-green-700 font-semibold' : 'text-gray-700'}`}>Bookings</NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink to="/add" className={({ isActive }) => `hover:text-green-700 ${isActive ? 'text-green-700 font-semibold' : 'text-gray-700'}`}>Add Resource</NavLink>
            </li>
          )}
          {isAuthenticated ? (
            <>
              {!isAdmin && (
                <li>
                  <NavLink to="/my-bookings" className={({ isActive }) => `hover:text-green-700 ${isActive ? 'text-green-700 font-semibold' : 'text-gray-700'}`}>My Bookings</NavLink>
                </li>
              )}
              <li className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">Welcome, {user?.name}</span>
                  {isAdmin && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login" className={({ isActive }) => `hover:text-green-700 ${isActive ? 'text-green-700 font-semibold' : 'text-gray-700'}`}>Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar

