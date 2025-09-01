import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllResources } from '../redux/slices/resourcesSlice.js'
import { selectUser } from '../redux/slices/authSlice.js'
import { addBooking } from '../redux/slices/bookingsSlice.js'

const BookingForm = ({ onSubmit, onClose, preSelectedResource }) => {
  const resources = useSelector(selectAllResources)
  const currentUser = useSelector(selectUser)
  const dispatch = useDispatch()
  
  const formik = useFormik({
    initialValues: { 
      resourceId: preSelectedResource ? preSelectedResource.id.toString() : '', 
      userName: currentUser?.name || '', 
      date: '', 
      notes: '' 
    },
    enableReinitialize: true, // Allow form to update when preSelectedResource or currentUser changes
    validate: (values) => {
      const errors = {}
      if (!values.resourceId) errors.resourceId = 'Required'
      if (!values.userName) errors.userName = 'Required'
      if (!values.date) errors.date = 'Required'
      return errors
    },
    onSubmit: (values) => {
      const selectedResource = resources.find(r => r.id === parseInt(values.resourceId))
      const newBooking = {
        resourceId: parseInt(values.resourceId),
        resourceName: selectedResource.name,
        userName: values.userName,
        date: values.date,
        notes: values.notes
      }
      
      dispatch(addBooking(newBooking))
      
      if (typeof onSubmit === 'function') onSubmit(newBooking)
      if (typeof onClose === 'function') onClose()
      
      formik.resetForm()
    },
  })

  return (
    <form className="space-y-4 max-w-md" onSubmit={formik.handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="resourceId">Resource</label>
        <select
          id="resourceId"
          name="resourceId"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={formik.values.resourceId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        >
          <option value="">Select a resource</option>
          {resources.map(resource => (
            <option key={resource.id} value={resource.id}>
              {resource.name} - ₹{resource.rate}/day
            </option>
          ))}
        </select>
        {formik.touched.resourceId && formik.errors.resourceId && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.resourceId}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="userName">Name</label>
        <input
          id="userName"
          name="userName"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
          readOnly={!!currentUser} // Make readonly if user is authenticated
        />
        {formik.touched.userName && formik.errors.userName && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.userName}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.date && formik.errors.date && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.date}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={formik.values.notes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      
      <div className="flex gap-2">
        <button 
          className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600" 
          type="submit"
        >
          Create Booking
        </button>
        {onClose && (
          <button 
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default BookingForm

