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
    const [img, setImg] = useState('')
    const [imgName, setImgName] = useState('')

    /* Text  */
    const [succes, setSucces] = useState(false)
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')
    /* Images */
    const [succesImg, setSuccesImg] = useState(false)
    const [succesImgText, setSuccesImgText] = useState('')
    const [errorImg, setErrorImg] = useState(false)
    const [errorTextImg, setErrorTextImg] = useState('')
    


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

  const uploadImage = async () => {
    try{
        if(!img){
          console.log('No image selected')
         }
        const res = await fetch('/api/images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                img,
                imgName
            })
        })
        const data2 = await res.json()
        if(data2){
            if(data2.error){
                setErrorImg(true)
                setErrorTextImg(data2.error)
                setTimeout(() => {
                    setErrorImg(false)
                    setErrorTextImg('')
                }, 3000)
            }else{
                setSuccesImg(true)
                setSuccesImgText(data2.message)
                setTimeout(() => {
                    setSuccesImg(false)
                }, 3000)
            }
        }
    }catch(err){
        console.log(err)
    }
  }


    return (
        ///flex flex-row 
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
        <div className="mx-auto mt-16" style={{
            maxWidth: '800px'
        }}>
            <h1 className="text-3xl font-semibold text-black mb-4">
                Zmień obrazki wyświetlane na karuzeli
            </h1>
            <div className="flex flex-col">
                <label className="block mb-2 font-semibold text-gray-700">
                    Dodaj obrazek
                </label>
                <input type="file" onChange={(e) => {
                    if(!e.target.files) return
                    if(e.target.files.length === 0) return
                    const file = e.target.files[0]
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onloadend = () => {
                        alert('Możesz teraz zapisać zmiany')
                        setImg(reader.result as string)
                    }
                }} className="block w-full mb-4 p-2 border border-gray-300 rounded-md"/>
                <label className="block mb-2 font-semibold text-gray-700">
                    Nazwa obrazka do dodania
                </label>
                <input type="text" value={imgName} onChange={e => setImgName(e.target.value)} className="block w-full mb-4 p-2 border border-gray-300 rounded-md" />
                <button className="mt-4 py-3 px-6 rounded-full bg-green-700 text-white font-semibold hover:bg-green-600 focus:outline-none focus:shadow-outline-green" onClick={(e) => uploadImage()}>
                    Zapisz zmiany
                </button>
                {succesImg === true && <p className="text-green-700 font-semibold mt-4">
                    Zmiany zostały zapisane
                </p>}
                {errorImg === true && <p className="text-red-700 font-semibold mt-4">
                    {errorTextImg}
                </p>}
            </div>
        </div>
        </div>
    )
}