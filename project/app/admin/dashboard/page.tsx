export default function Page(){
    return (
        <div className="mx-auto mt-16" style={{
            maxWidth: '800px'
        }}>
            <h1 className="text-3xl font-semibold text-black mb-4">
                Panel administratora
            </h1>
            <div className="flex flex-col">
                <label className="block mb-2 font-semibold text-gray-700">
                    Adres email na głownej stronie
                </label>
                <input type="email" className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <label className="block mb-2 font-semibold text-gray-700">
                    Tekst o nas na głownej stronie
                </label>
                <textarea className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <label className="block mb-2 font-semibold text-gray-700">
                    Numer telefonu na głownej stronie
                </label>
                <input type="text" className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <label className="block mb-2 font-semibold text-gray-700">
                    Adres na głownej stronie
                </label>
                <input type="text" className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <button className="mt-4 py-3 px-6 rounded-full bg-green-700 text-white font-semibold hover:bg-green-600 focus:outline-none focus:shadow-outline-green">
                    Zapisz zmiany
                </button>
            </div>
        </div>
    )
}