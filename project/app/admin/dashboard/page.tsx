"use client"
import {useEffect, useState} from 'react'



export default function Page(){

    const [loading, setLoading] = useState(true)

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
    
    // image del

    const [imageDel, setImageDel] = useState('')
    const [images, setImages] = useState<any[]>([])



    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token === null){
            window.location.href = '/admin'
        }
        const fetchData = async () => {
            try {
                const res = await fetch('/api/images', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await res.json()
                if(data){
                    setImages(data)
                    setLoading(false)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])



    useEffect(() => {
        console.log(images)
    },[images])

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

  const deleteImage = async () => {
    
  }


    return (
        loading ? <div className="flex justify-center items-center h-screen">
        <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
      </div> :
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
            <div className="mx-auto mt-16">
            <h1 className="text-3xl font-semibold text-black mb-4 mt-8">
                Usuń obrazek z karuzeli
            </h1>
            <div className="flex flex-col">
                <label className="block mb-2 font-semibold text-gray-700">
                    Wybierz obrazek z listy poniżej
                </label>
                <select className="block w-full mb-4 p-2 border border-gray-300 rounded-md" onChange={(e) => {
                    setImageDel(e.target.value)
                }}>
                    <option value="0">Wybierz obrazek</option>
                    {images.map((image, index) => {
                        return <option key={image.id} value={image.id}>{image.photohash}</option>
                    })}
                </select>
                <button className="mt-4 py-3 px-6 rounded-full bg-green-700 text-white font-semibold hover:bg-green-600 focus:outline-none focus:shadow-outline-green" onClick={(e) => deleteImage()}>
                    Usuń obrazek
                </button>
            </div>
            </div>
        </div>
        </div>
    )
}