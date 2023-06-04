"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {AiFillCaretRight, AiFillCaretLeft} from 'react-icons/ai'
import Navbar from './components/Navbar/Navbar'
import Loading from './components/Loading/Loading'


export default function Page(){

    const [currentSlide, setCurrentSlide] = useState(0)
    const [maxSlide, setMaxSlide] = useState(4)
    const [data, setData] = useState<any[]>([])
    const [dataPhotos, setDataPhotos] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [readMore, setReadMore] = useState(false)

    const [mainCourse, setMainCourse] = useState<any[]>([])
    const [startes, setStartes] = useState<any[]>([])
    const [desserts, setDesserts] = useState<any[]>([])

    const prevSlide = () => {
        setCurrentSlide(currentSlide - 1)
    }

    const nextSlide = () => {
        setCurrentSlide(currentSlide + 1)
    }

    const resetSlide = () => {
        setCurrentSlide(0)
    }


    useEffect(() => {
        if (currentSlide < 0) {
            resetSlide()
        } else if (currentSlide > maxSlide) {
            resetSlide()
        }
    }, [currentSlide,maxSlide])

    useEffect(() => {
        fetch('api/data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
          const length = data.data2.length
          setMaxSlide(length)
            data.data2.map((item: any) => {
              setDataPhotos(prev => [...prev, {photohash: item.photohash}])
              setLoading(false)
            })
            setData(data.data)
            setMainCourse(data.data3.filter((item: any) => item.category === 'Danie główne'))
            setStartes(data.data3.filter((item: any) => item.category === 'Przystawka'))
            setDesserts(data.data3.filter((item: any) => item.category === 'Deser'))
            if(length === 0){
              setLoading(false)
            }
        })
    },[])

    function readMoreHandler() {
        setReadMore(!readMore)
    }



    const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#333" offset="20%" />
          <stop stop-color="#222" offset="50%" />
          <stop stop-color="#333" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#333" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`

    

const toBase64 = (str: string) =>
typeof window === 'undefined'
  ? Buffer.from(str).toString('base64')
  : window.btoa(str)



    return (
        loading ? <Loading/> : 
      <>
      <Navbar/>
      <section className="bg-white-500 text-white py-16" style={{
        height: '460px',
      }}>
      <div className="container mx-auto px-4 flex media-container">
        <div className="w-1/2 pr-8">
          <h1 className="lg:text-5xl sm:text-xl font-bold leading-tight mb-4 mt-12 text-green-600">Szczaw i Mirabelki</h1>
           {readMore ? data.map((item: any) => {
            return (
                <p key='1' className="lg:text-2xl mb-4 text-gray-400 overflow">{item.title} <span className="text-blue-400" onClick={() => readMoreHandler()}>(Schowaj tekst)</span></p>
            )
           }
              ) : data.map((item: any) => {
            return (
                item.title.length > 100 ? <p key='2' className="lg:text-2xl mb-4 text-gray-400 overflow">{item.title.slice(0, 200)}... <span className="text-blue-400" onClick={() => readMoreHandler()}>(Czytaj więcej)</span></p> : <p key='3' className="lg:text-2xl mb-4 text-gray-400">{item.title} <span className="text-blue-400" onClick={() => readMoreHandler()}>(Czytaj więcej)</span></p>
            ) 
            }
              )}

          <a href="https://szczaw-i-mirabelki.dowozimy.pl/" className="px-4 py-2 rounded-full bg-black focus:outline-none focus:shadow-outline-black text-white mt-6 transition ease-in-out delay-75 bg-green-600 hover:bg-green-800 sm:h-56 sm:w-7">Zamów teraz</a>
        </div>
        <div className="w-1/2">
            <div className="relative overflow-hidden bg-black rounded-xl shadow-2xl shadow-green-600 slider-class">
                <div className="relative z-10"
                style={{
                    maxWidth: '100%',
                }}
                >
                    <div className='relative overflow-hidden bg-black h-56 sm:h-72 md:h-96 lg:h-128'>
                    {dataPhotos.map((item, index) => {
                        return (
                          <>
                            <div key={index} className='absolute w-full h-full' style={
                                currentSlide === index ? {display: 'block'} : {display: 'none'}
                            }>
                               <Image src={`${item.photohash}`} width={800} height={500} className="absolute inset-0 h-full w-full object-cover" alt='photo' placeholder='blur' blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(800, 500))}`} />
                            </div>
                            </>
                    )})}
                    </div>
                    <div className='relative z-20 flex justify-center mt-4 sm:mt-8 md:mt-12 lg:mt-16 mb-3' style={
                    {display: 'flex', justifyContent: 'center', position: 'absolute', bottom: '0', width: '100%'}
                }>
                  <button aria-label='button-switch-left' className="w-8 h-8 rounded-full bg-green-700 hover:bg-green-600 focus:outline-none focus:shadow-outline-green" onClick={() => prevSlide()} style={
                        currentSlide === 0 ? {display: 'none'} : {display: 'block', marginRight: '0.5rem'}
                  }>
                    <AiFillCaretLeft className="w-5 h-5 text-white" style={{
                        position: 'relative',
                        left: '0.3rem'
                    }}/>
              </button>
                  <button aria-label='button-switch-right' className="ml-4 w-8 h-8 rounded-full bg-green-700 hover:bg-green-600 focus:outline-none focus:shadow-outline-green" onClick={() => nextSlide()} style={
                        currentSlide === maxSlide ? {display: 'none'} : {display: 'block', marginLeft: '0.5rem'}
                  }>
                    <AiFillCaretRight className="w-5 h-5 text-white" style={{
                        position: 'relative',
                        left: '0.3rem'
                    }}/>
                   </button>
                </div>

                </div>
            </div>
      </div>
      </div>
    </section>
    <section className="bg-gray-200 py-12 mt-12 media-container2">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8">Menu</h2>
    <div className="flex flex-wrap -mx-4">
      <div className="w-1/3 px-4 mb-8" style={{
          height: '400px',
          overflowY: 'auto'
        }}>
        <h3 className="text-lg font-bold mb-4">Dania główne</h3>
        {mainCourse.map((item: any) => {
          return (
            <div  key={item.id} className="flex items-start mb-4">
              {item.image ? <Image src={`${item.image}`} alt='dish' width={110} height={160} className='rounded-full mr-4 flex items-center justify-center text-white text-xl font-bold'/>
              : <div className="w-16 h-16 rounded-full bg-green-500 mr-4 flex items-center justify-center text-white text-xl font-bold">D</div>
              }
              <div className="flex-grow">
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p className="text-gray-700 mb-2">{item.ingredients}</p>
                <p className="text-xl font-bold text-green-500">{item.price} zł</p>
              </div>
            </div>
          )
        })}
        {mainCourse.length === 0 && <p className="text-gray-700 mb-2">Brak dań głównych</p>}
      </div>
      <div className="w-1/3 px-4 mb-8" style={{
          height: '400px',
          overflowY: 'auto'
        }}>
      <h3 className="text-lg font-bold mb-4 ">Przystawki</h3>
        {startes.map((item: any) => {
          return (
            <div key={item.id} className="flex items-start mb-4">
              {item.image ? <Image src={`${item.image}`} alt='dish' width={110} height={160} className='rounded-full mr-4 flex items-center justify-center text-white text-xl font-bold'/>
              : <div className="w-16 h-16 rounded-full bg-green-500 mr-4 flex items-center justify-center text-white text-xl font-bold">P</div>
              }
              <div className="flex-grow">
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p className="text-gray-700 mb-2">{item.ingredients}</p>
                <p className="text-xl font-bold text-green-500">{item.price} zł</p>
              </div>
            </div>
          )
        })}
        {startes.length === 0 && <p className="text-gray-700 mb-2">Brak przystawek</p>}
        </div>
        <div className="w-1/3 px-4 mb-8" style={{
          height: '400px',
          overflowY: 'auto'
        }}>
        <h3 className="text-lg font-bold mb-4">Desery</h3>
        {desserts.map((item: any) => {
          return (
            <div key={item.id} className="flex items-start mb-4">
              {item.image ? <Image src={`${item.image}`} alt='dish' width={110} height={160} className='rounded-full mr-4 flex items-center justify-center text-white text-xl font-bold'/>
              : <div className="w-16 h-16 rounded-full bg-green-500 mr-4 flex items-center justify-center text-white text-xl font-bold">D</div>
              }
              <div className="flex-grow">
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p className="text-gray-700 mb-2">{item.ingredients}</p>
                <p className="text-xl font-bold text-green-500">{item.price} zł</p>
              </div>
            </div>
          )
        })}
        {desserts.length === 0 && <p className="text-gray-700 mb-2">Brak deserów</p>}
        </div>
        </div>
        </div>
        </section>
<footer className="bg-green-500 py-8 text-white media-footer">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap -mx-4">
      <div className="w-full md:w-1/3 px-4 mb-8">
        {data.map((item) => {
            return (
                <>
                <h3 className="text-xl font-bold mb-2">Lokalizacja</h3>
                <p>{item.address} {item.address2}</p>
                </>
            )
        })}
      </div>
      <div className="w-full md:w-1/3 px-4 mb-8">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-2">Godziny otwarcia</h3>
          <p>Niedziela - czwartek: 9:00-23:00</p>
          <p>Piątek - sobota: 9:00-24:00</p>
        </div>
      </div>
      <div className="w-full md:w-1/3 px-4 mb-8">
        <h3 className="text-xl font-bold mb-2">Kontakt</h3>
        {data.map((item) => {
            return (
                <>
                <p>Tel. <a className="text-white hover:underline" href={`tel:+48${item.phone}`}>+48 {item.phone}</a></p>
                <p>E-mail: <a className="text-white hover:underline" href={`mailto:${item.email}`}>{item.email}</a></p>
                </>
            )
        })}
        </div>
    </div>
  </div>
  </footer>
    </>
    )
}