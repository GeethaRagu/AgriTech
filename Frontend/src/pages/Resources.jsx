// src/pages/Resources.jsx
import { useSelector } from 'react-redux'
import ResourceCard from '../components/ResourceCard'
import { selectAllResources } from '../redux/slices/resourcesSlice.js'

export default function Resources() {
  const resources = useSelector(selectAllResources)
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-semibold text-gray-800">Available Resources</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((res) => (
          <ResourceCard key={res.id} resource={res} />
        ))}
      </div>
    </main>
  );
}
