import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  resources: [
    { id: 1, name: "Tractor", description: "50 HP tractor available.", rate: 1500, category: "Equipment", location: "Field A", availability: "Available" },
    { id: 2, name: "Water Pump", description: "Diesel pump for irrigation.", rate: 500, category: "Equipment", location: "Field B", availability: "Available" },
    { id: 3, name: "Labor Team", description: "Group of 5 farm workers.", rate: 2000, category: "Labor", location: "Various", availability: "Available" },
    { id: 4, name: "Soil Testing Kit", description: "Complete soil analysis kit.", rate: 300, category: "Tool", location: "Warehouse", availability: "Available" },
    { id: 5, name: "Greenhouse Space", description: "Climate controlled growing area.", rate: 800, category: "Facility", location: "North Wing", availability: "Available" },
  ],
  loading: false,
  error: null
}

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    addResource: (state, action) => {
      const newResource = {
        ...action.payload,
        id: Date.now(), // Simple ID generation
        availability: "Available"
      }
      state.resources.push(newResource)
    },
    updateResource: (state, action) => {
      const { id, updates } = action.payload
      const resourceIndex = state.resources.findIndex(resource => resource.id === id)
      if (resourceIndex !== -1) {
        state.resources[resourceIndex] = { ...state.resources[resourceIndex], ...updates }
      }
    },
    deleteResource: (state, action) => {
      state.resources = state.resources.filter(resource => resource.id !== action.payload)
    },
    setResources: (state, action) => {
      state.resources = action.payload
    }
  }
})

export const { addResource, updateResource, deleteResource, setResources } = resourcesSlice.actions
export default resourcesSlice.reducer

// Selectors
export const selectAllResources = (state) => state.resources.resources
export const selectResourceById = (state, resourceId) => 
  state.resources.resources.find(resource => resource.id === resourceId)
export const selectResourcesByCategory = (state, category) =>
  state.resources.resources.filter(resource => resource.category === category) 