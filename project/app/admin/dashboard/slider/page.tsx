"use client"
import { useState, useEffect } from 'react'

export default function Page(){

    const [loading, setLoading] = useState(true)

    const [img, setImg] = useState('')
    const [imgName, setImgName] = useState('')

     /* Images */
     const [succesImg, setSuccesImg] = useState(false)
     const [succesImgText, setSuccesImgText] = useState('')
     const [errorImg, setErrorImg] = useState(false)
     const [errorTextImg, setErrorTextImg] = useState('')
     
     // image del
 
     const [imageDel, setImageDel] = useState('')
     const [images, setImages] = useState<any[]>([])
     const [succesDel, setSuccesDel] = useState(false)
     const [errorDel, setErrorDel] = useState(false)
     const [errorTextDel, setErrorTextDel] = useState('')
     const [succesTextDel, setSuccesTextDel] = useState('')
     const [loadingDel, setLoadingDel] = useState(false)


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
        try {
            const res = await fetch('/api/images', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    id: imageDel
                })
            })
            const data = await res.json()
            if(data){
                if(data.error){
                    setErrorDel(true)
                    setErrorTextDel(data.error)
                    setTimeout(() => {
                        setErrorDel(false)
                        setErrorTextDel('')
                    }, 3000)
                }else{
                    setSuccesDel(true)
                    setSuccesTextDel(data.message)
                    setTimeout(() => {
                        setSuccesDel(false)
                    }, 3000)
                }
            }
        } catch (error) {
            console.log(error)
        }
        
      }


    return (
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
                <select value={imageDel} onChange={e => setImageDel(e.target.value)} className="block w-full mb-4 p-2 border border-gray-300 rounded-md">
                    {images.length === 0 ? <option disabled>Brak obrazków</option> : images.map((image, index) => {
                        return <option key={image.id} value={image.id}>{image.name}</option>
                    })
                    }
                </select>
                <button className="mt-4 py-3 px-6 rounded-full bg-green-700 text-white font-semibold hover:bg-green-600 focus:outline-none focus:shadow-outline-green" onClick={(e) => deleteImage()}>
                    Usuń obrazek
                </button>
                {succesDel === true && <p className="text-green-700 font-semibold mt-4">
                    Zmiany zostały zapisane
                </p>}
                {errorDel === true && <p className="text-red-700 font-semibold mt-4">
                    {errorTextDel}
                </p>}
            </div>
            </div>
        </div>

    )
}