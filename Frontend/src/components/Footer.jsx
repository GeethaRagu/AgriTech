const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600">© {year} AgriTech. All rights reserved.</div>
    </footer>
  )
}

export default Footer

