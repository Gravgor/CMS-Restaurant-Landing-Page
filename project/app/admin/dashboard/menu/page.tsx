"use client"

import {useState, useEffect} from 'react'
import Loading from "../../../components/Loading/Loading";

export default function Page(){


    const [menu, setMenu] = useState<any[]>([])
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [errorBool, setErrorBool] = useState(false)
    const [successBool, setSuccessBool] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token === null){
            window.location.href = '/admin'
        }
        const fetchData = async () => {
            fetch('/api/menu', {
                method: 'GET',
            },
            ).then(res => res.json())
            .then(data => {
                setMenu(data)
                setLoading(false)
            })
        }
        fetchData()
    }, [])

    const addDish = async () => {
        const data = {
            category,
            name,
            price,
            ingredients
        }
        fetch('/api/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                setError(data.error)
                setErrorBool(true)
                setTimeout(() => {
                    setError('')
                    setErrorBool(false)
                }, 3000)
            } else {
                setSuccess(data.success)
                setSuccessBool(true)
                setTimeout(() => {
                    setSuccess('')
                    setSuccessBool(false)
                }, 3000)
            }
        })
    }


    const deleteDish = async (id: string) => {
        fetch(`/api/menu/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                id
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                setError(data.error)
                setErrorBool(true)
                setTimeout(() => {
                    setError('')
                    setErrorBool(false)
                }, 3000)
            } else {
                setSuccess(data.success)
                setSuccessBool(true)
                setTimeout(() => {
                    setSuccess('')
                    setSuccessBool(false)
                }, 3000)
            }
        }
        )
    }



        return (
            <>
            {loading ? <Loading/> :
            <>
            <div className="container mx-auto px-4 mb-8">
            <h2 className="text-2xl font-bold mb-4">Zarządzanie menu</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Kategoria</label>
                <select className="block w-full bg-white border-2 border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:border-green-500" id="category" onChange={(e) => setCategory(e.target.value)}>
                    <option>Wybierz kategorię</option>
                    <option>Danie główne</option>
                    <option>Przystawka</option>
                    <option>Deser</option>
        </select>
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Nazwa</label>
        <input className="block w-full bg-white border-2 border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:border-green-500" type="text" id="name" placeholder="np. Krem z pomidorów z serem feta" onChange={(e) => setName(e.target.value)}/>
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Składniki</label>
        <textarea className="block w-full bg-white border-2 border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:border-green-500" id="ingredients" placeholder="np. pomidory, ser feta, cebula, czosnek, oliwa, sól, pieprz, biały pieprz, cukier, śmietana 18%" onChange={
            (e) => setIngredients(e.target.value)
        }></textarea>
    </div>
    <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Cena</label>
        <input className="block w-full bg-white border-2 border-gray-400 rounded py-2 px-4 leading-tight focus:outline-none focus:border-green-500" type="number" id="price" placeholder="np. 19,99" onChange={
            (e) => setPrice(e.target.value)
        }/>
    </div>
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" id="add-button" onClick={
       (e) => addDish()
    }>Dodaj</button>
    {errorBool && <p className="text-red-500 text-xs italic">{error}</p>}
    {successBool && <p className="text-green-500 text-xs italic">{success}</p>}
    </div>

    <div className="container mx-auto px-4 mb-8">
    <h2 className="text-2xl font-bold mb-4">Lista dań</h2>
    <table className="w-full text-left table-collapse">
        <thead>
        <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nazwa</th>
            <th className="px-4 py-2">Kategoria</th>
            <th className="px-4 py-2">Cena</th>
            <th className="px-4 py-2">Akcje</th>
            </tr>
        </thead>
        <tbody>
        {menu.length > 0 && menu.map((dish, index) => {
            return (
                <tr key={index}>
                    <td className="border px-4 py-2">{dish.id}</td>
                    <td className="border px-4 py-2">{dish.name}</td>
                    <td className="border px-4 py-2">{dish.category}</td>
                    <td className="border px-4 py-2">{dish.price}</td>
                    <td className="border px-4 py-2">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" id="add-button" onClick={() => deleteDish(dish.id)}>Usuń</button>
                    </td>
                </tr>
            )
        })}
        {menu.length === 0 && <tr><td className="border px-4 py-2">Brak dań w menu</td></tr>}
        </tbody>
        </table>
    </div>
            </>
}
            </>
        )
    }