"use client"
import { useState } from "react"

export default function Page () {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const handleFetch = async () => {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    type: 'login'
                })
            })
            const data = await res.json()
            if(data.token !== undefined){
                localStorage.setItem('token', data.token)
                window.location.href = '/admin/dashboard'
            }
        }
        handleFetch()
    }

    return (
        <div className="mx-auto mt-16" style={{
            maxWidth: '400px'
        }}>
            <h1 className="text-3xl font-semibold text-black mb-4">
                Panel administratora
            </h1>
                <label className="block mb-2 font-semibold text-gray-700">
                    Adres email
                </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <label className="block mb-2 font-semibold text-gray-700">
                    Hasło
                </label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <button onClick={handleSubmit} className="mt-4 py-3 px-6 rounded-full bg-green-700 text-white font-semibold hover:bg-green-600 focus:outline-none focus:shadow-outline-green">
                    Zaloguj się
                </button>
        </div>
    )
}