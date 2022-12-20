"use client"
import {useEffect, useState} from 'react'
import Loading from "../../components/Loading/Loading";



export default function Page(){

    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [address2, setAddress2] = useState('')

    /* Text  */
    const [succes, setSucces] = useState(false)
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')
   



    const handleSubmit = (e: any) => {
        e.preventDefault()
        const handleFetch = async () => {
            if(email != ''){
                const res = await fetch('/api/data',{
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
                        address2,
                        type: 'email'
                    })
                })
                const data = await res.json()
                if(data){
                    if(data.error){
                        setError(true)
                        setErrorText(data.error)
                        setTimeout(() => {
                            setError(false)
                            setErrorText('')
                        }, 3000)
                    }else{
                        setSucces(true)
                        setTimeout(() => {
                            setSucces(false)
                        }, 3000)
                    }
                }
            }
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
                if(data.error){
                    setError(true)
                    setErrorText(data.error)
                    setTimeout(() => {
                        setError(false)
                        setErrorText('')
                    }, 3000)
            }else{
                setSucces(true)
                setTimeout(() => {
                    setSucces(false)
                }, 3000)
            }
          }
        }
        handleFetch()
    }




    return (
        loading ? <Loading/> :
        <div className="flex flex-row">
            <div className="mx-auto mt-16" style={{
            maxWidth: '800px'
        }}>
            <h1 className="text-3xl font-semibold text-black mb-4">
                Edycja tekstu na stronie głównej
            </h1>
            <div className="flex flex-col">
                <label className="block mb-2 font-semibold text-gray-700">
                    Zmiana email
                </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />                
                <label className="block mb-2 font-semibold text-gray-700">
                    Zmiana głównego tekstu
                </label>
                <textarea value={title} onChange={e => setTitle(e.target.value)} className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <label className="block mb-2 font-semibold text-gray-700">
                    Zmiana numeru telefonu
                </label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <label className="block mb-2 font-semibold text-gray-700">
                    Zmiana ulicy oraz numeru lokalu
                </label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <label className="block mb-2 font-semibold text-gray-700">
                    Zmiana kodu pocztowego oraz miasta
                </label>
                <input type="text" value={address2} onChange={e => setAddress2(e.target.value)} className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <button onClick={handleSubmit} className="mt-4 py-3 px-6 rounded-full bg-green-700 text-white font-semibold hover:bg-green-600 focus:outline-none focus:shadow-outline-green">
                    Zapisz zmiany
                </button>
                {succes === true && <p className="text-green-700 font-semibold mt-4">
                    Zmiany zostały zapisane
                </p>}
                {error === true && <p className="text-red-700 font-semibold mt-4">
                    {errorText}
                </p>}
            </div>
        </div>
    </div>
    )
}