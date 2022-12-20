export default function Navbar(){
    return (
      <nav className=" flex items-center justify-center px-4 py-3 bg-transparent text-green-600 z-auto navbar">
      <div className="text-lg lg:flex-grow justify-center items-center lg:inline-block mx-auto">
  </div>
    <div className="ml-4 button-group">
      <a href="https://szczaw-i-mirabelki.dowozimy.pl/#menu" className="px-4 py-2 rounded-full transition ease-in-out delay-75 bg-green-600 hover:bg-green-800 focus:outline-none focus:shadow-outline-green text-white mr-2">
        Zobacz menu
      </a>
      <a href="https://szczaw-i-mirabelki.dowozimy.pl/" className="px-4 py-2 rounded-full transition ease-in-out delay-75 bg-green-600 hover:bg-green-800 focus:outline-none focus:shadow-outline-green text-white">
        Zamówienie online
      </a>
    </div>
    </nav>
    )
}