"use client"

export default function Page () {
    return (
        <div className="mx-auto mt-16" style={{
            maxWidth: '400px'
        }}>
            <h1 className="text-3xl font-semibold text-black mb-4">
                Panel administratora
            </h1>
            <form>
                <label className="block mb-2 font-semibold text-gray-700">
                    Adres email
                </label>
                <input type="email" className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <label className="block mb-2 font-semibold text-gray-700">
                    Hasło
                </label>
                <input type="password" className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <button className="mt-4 py-3 px-6 rounded-full bg-green-700 text-white font-semibold hover:bg-green-600 focus:outline-none focus:shadow-outline-green">
                    Zaloguj się
                </button>
            </form>
        </div>
    )
}