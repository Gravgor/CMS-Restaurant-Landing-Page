"use client"
import {useEffect, useState} from 'react'


export default function Page(){
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token === null){
            window.location.href = '/admin'
        }
    }, [])

    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [address2, setAddress2] = useState('')
    const [succes, setSucces] = useState(false)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const handleFetch = async () => {
            const res = await fetch('/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    email,
                    title,
                    phone,
                    address,
                    address2
                })
            })
            const data = await res.json()
            if(data){
                setSucces(true)
            }
        }
        handleFetch()
    }


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
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />                
                <label className="block mb-2 font-semibold text-gray-700">
                    Tekst o nas na głownej stronie
                </label>
                <textarea value={title} onChange={e => setTitle(e.target.value)} className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <label className="block mb-2 font-semibold text-gray-700">
                    Numer telefonu na głownej stronie
                </label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <label className="block mb-2 font-semibold text-gray-700">
                    Ulica i numer lokalu na głownej stronie
                </label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <label className="block mb-2 font-semibold text-gray-700">
                    Kod pocztowy, miasto na głownej stronie
                </label>
                <input type="text" value={address2} onChange={e => setAddress2(e.target.value)} className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <button onClick={handleSubmit} className="mt-4 py-3 px-6 rounded-full bg-green-700 text-white font-semibold hover:bg-green-600 focus:outline-none focus:shadow-outline-green">
                    Zapisz zmiany
                </button>
                {succes === true && <p className="text-green-700 font-semibold mt-4">
                    Zmiany zostały zapisane
                </p>}
            </div>
        </div>
    )
}