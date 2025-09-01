import { useSelector } from 'react-redux'
import Footer from '../components/Footer.jsx'
import ResourceCard from '../components/ResourceCard.jsx'
import { selectAllResources } from '../redux/slices/resourcesSlice.js'

const Home = () => {
  const resources = useSelector(selectAllResources)
  
  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to AgriTech</h2>
        <p className="mt-2 text-gray-600">Discover and book agricultural resources with ease.</p>
        <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.slice(0, 3).map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home

