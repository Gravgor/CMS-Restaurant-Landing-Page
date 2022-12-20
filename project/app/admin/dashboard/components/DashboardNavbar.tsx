

export default function DashboardNav(){
    return (
        <nav className="bg-white fixed top-0 z-40 w-full shadow">
  <div className="container mx-auto px-4 flex items-center justify-between">
    <a className="text-xl font-bold text-green-500 hover:text-green-700 focus:outline-none focus:shadow-outline" href="/">Szczaw i Mirabelki</a>
    <div className="flex items-center">
      <a className="mr-6 text-gray-700 hover:text-green-500 focus:outline-none focus:shadow-outline" href="/admin/dashboard">Dashboard</a>
      <a className="mr-6 text-gray-700 hover:text-green-500 focus:outline-none focus:shadow-outline" href="/admin/dashboard/menu">Zarządzanie menu</a>
      <a className="text-gray-700 hover:text-red-500 focus:outline-none focus:shadow-outline" href="/logout">Wyloguj się</a>
    </div>
  </div>
</nav>
    )
}