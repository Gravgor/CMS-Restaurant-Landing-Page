"use client"
import { useEffect } from "react"

export default function Page(){


    useEffect(() => {
        setTimeout(() => {
            handleLogout()
        }, 3000)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    const handleLogin = () => {
        window.location.href = '/admin'
    }

    return (
        <div className="mx-auto mt-16" style={{
            maxWidth: '400px'
        }}>
            <h1 className="text-3xl font-semibold text-black mb-4">
                Wylogowano 
            </h1>
            <p className="mb-4">
                Zostałeś wylogowany z panelu administratora. Za chwilę zostaniesz przekierowany na stronę główną.
            </p>
            <button onClick={handleLogin} className="mt-4 py-3 px-6 rounded-full bg-green-700 text-white font-semibold hover:bg-green-600 focus:outline-none focus:shadow-outline-green">
                Zaloguj się ponownie
            </button>
        </div>
    )

}