"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {AiFillCaretRight, AiFillCaretLeft} from 'react-icons/ai'
import { Wrapper, Status } from "@googlemaps/react-wrapper";


export default function Page(){

    const [currentSlide, setCurrentSlide] = useState(0)
    const [data, setData] = useState<any[]>([])
    const [dataPhotos, setDataPhotos] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [readMore, setReadMore] = useState(false)

    const prevSlide = () => {
        setCurrentSlide(currentSlide - 1)
    }

    const nextSlide = () => {
        setCurrentSlide(currentSlide + 1)
    }

    const resetSlide = () => {
        setCurrentSlide(0)
    }


    const render = (status: Status) => {
        return <h1>{status}</h1>;
      };


    useEffect(() => {
        if (currentSlide < 0) {
            resetSlide()
        } else if (currentSlide > 4) {
            resetSlide()
        }
    }, [currentSlide])

    useEffect(() => {
        fetch('api/data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            data.data2.map((item: any) => {
              setDataPhotos(prev => [...prev, {photohash: item.photohash}])
              setLoading(false)
            })
            setData(data.data)
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
        loading ? <div className="flex justify-center items-center h-screen">
        <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
      </div> : 
      <>
      <section className="bg-white-500 text-white py-16" style={{
        height: '460px',
      }}>
      <div className="container mx-auto px-4 flex">
        <div className="w-1/2 pr-8">
          <h1 className="text-5xl font-bold leading-tight mb-4 mt-12 text-green-600">Szczaw i Mirabelki</h1>
           {readMore ? data.map((item: any) => {
            return (
                <p key='1' className="text-xl mb-4 text-gray-400">{item.title} <span className="text-blue-400" onClick={() => readMoreHandler()}>(Schowaj tekst)</span></p>
            )
           }
              ) : data.map((item: any) => {
            return (
                item.title.length > 100 ? <p key='2' className="text-xl mb-4 text-gray-400">{item.title.slice(0, 200)}... <span className="text-blue-400" onClick={() => readMoreHandler()}>(Czytaj więcej)</span></p> : <p key='3' className="text-xl mb-4 text-gray-400">{item.title} <span className="text-blue-400" onClick={() => readMoreHandler()}>(Czytaj więcej)</span></p>
            ) 
            }
              )}

          <a href="#" className="px-4 py-2 rounded-full bg-black focus:outline-none focus:shadow-outline-black text-white mt-6">Zamów teraz</a>
        </div>
        <div className="w-1/2">
            <div className="relative overflow-hidden bg-black rounded-xl shadow-2xl shadow-green-600">
                <div className="relative z-10"
                style={{
                    maxWidth: '100%',
                }}
                >
                    <div className='relative overflow-hidden bg-black h-56 sm:h-72 md:h-96 lg:h-128'>
                    {dataPhotos.map((item, index) => {
                        return (
                            <div key={index} className='absolute w-full h-full' style={
                                currentSlide === index ? {display: 'block'} : {display: 'none'}
                            }>
                               <Image src={`${item.photohash}`} width={800} height={500} className="absolute inset-0 h-full w-full object-cover" alt='photo' placeholder='blur' blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(800, 500))}`} />
                            </div>
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
                        currentSlide === 4 ? {display: 'none'} : {display: 'block', marginLeft: '0.5rem'}
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
    <section className="bg-gray-200 py-12 mt-12">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8">Menu</h2>
    <div className="flex flex-wrap -mx-4">
      <div className="w-1/3 px-4 mb-8">
        <div className="flex items-start mb-4">
          <div className="w-16 h-16 rounded-full bg-green-500 mr-4 flex items-center justify-center text-white text-xl font-bold">D</div>
          <div className="flex-grow">
            <h3 className="text-lg font-bold mb-2">Dziadek na warzywach</h3>
            <p className="text-gray-700 mb-2">Krem z cukinii, fasolka szparagowa, pomidorki cherry</p>
            <p className="text-xl font-bold text-green-500">25 zł</p>
          </div>
        </div>
        <div className="flex items-start mb-4">
          <div className="w-16 h-16 rounded-full bg-green-500 mr-4 flex items-center justify-center text-white text-xl font-bold">S</div>
          <div className="flex-grow">
            <h3 className="text-lg font-bold mb-2">Sałatka z burakami</h3>
            <p className="text-gray-700 mb-2">Buraki, orzechy włoskie, ser feta, sos balsamiczny</p>
            <p className="text-xl font-bold text-green-500">20 zł</p>
          </div>
        </div>
        <div className="flex items-start mb-4">
          <div className="w-16 h-16 rounded-full bg-green-500 mr-4 flex items-center justify-center text-white text-xl font-bold">Z</div>
          <div className="flex-grow">
            <h3 className="text-lg font-bold mb-2">Zapiekanka z pieczarkami</h3>
            <p className="text-gray-700 mb-2">Pieczarki, sos śmietanowy, ser gouda, zioła</p>
            <p className="text-xl font-bold text-green-500">18 zł</p>
          </div>
        </div>
      </div>
      <div className="w-1/3 px-4 mb-8">
        <div className="flex items-start mb-4">
          <div className="w-16 h-16 rounded-full bg-green-500 mr-4 flex items-center justify-center text-white text-xl font-bold">D</div>
            <div className="flex-grow">
                <h3 className="text-lg font-bold mb-2">Dziadek na warzywach</h3>
                <p className="text-gray-700 mb-2">Krem z cukinii, fasolka szparagowa, pomidorki cherry</p>
                <p className="text-xl font-bold text-green-500">25 zł</p>
            </div>
        </div>
        <div className="flex items-start mb-4">
          <div className="w-16 h-16 rounded-full bg-green-500 mr-4 flex items-center justify-center text-white text-xl font-bold">D</div>
            <div className="flex-grow">
                <h3 className="text-lg font-bold mb-2">Dziadek na warzywach</h3>
                <p className="text-gray-700 mb-2">Krem z cukinii, fasolka szparagowa, pomidorki cherry</p>
                <p className="text-xl font-bold text-green-500">25 zł</p>
            </div>
        </div>
        <div className="flex items-start mb-4">
          <div className="w-16 h-16 rounded-full bg-green-500 mr-4 flex items-center justify-center text-white text-xl font-bold">D</div>
            <div className="flex-grow">
                <h3 className="text-lg font-bold mb-2">Dziadek na warzywach</h3>
                <p className="text-gray-700 mb-2">Krem z cukinii, fasolka szparagowa, pomidorki cherry</p>
                <p className="text-xl font-bold text-green-500">25 zł</p>
            </div>
        </div>
        </div>
        <div className="w-1/3 px-4 mb-8">
        <div className="flex items-start mb-4">
          <div className="w-16 h-16 rounded-full bg-green-500 mr-4 flex items-center justify-center text-white text-xl font-bold">D</div>
            <div className="flex-grow">
                <h3 className="text-lg font-bold mb-2">Dziadek na warzywach</h3>
                <p className="text-gray-700 mb-2">Krem z cukinii, fasolka szparagowa, pomidorki cherry</p>
                <p className="text-xl font-bold text-green-500">25 zł</p>
            </div>
        </div>
        <div className="flex items-start mb-4">
          <div className="w-16 h-16 rounded-full bg-green-500 mr-4 flex items-center justify-center text-white text-xl font-bold">D</div>
            <div className="flex-grow">
                <h3 className="text-lg font-bold mb-2">Dziadek na warzywach</h3>
                <p className="text-gray-700 mb-2">Krem z cukinii, fasolka szparagowa, pomidorki cherry</p>
                <p className="text-xl font-bold text-green-500">25 zł</p>
            </div>
        </div>
        <div className="flex items-start mb-4">
          <div className="w-16 h-16 rounded-full bg-green-500 mr-4 flex items-center justify-center text-white text-xl font-bold">D</div>
            <div className="flex-grow">
                <h3 className="text-lg font-bold mb-2">Dziadek na warzywach</h3>
                <p className="text-gray-700 mb-2">Krem z cukinii, fasolka szparagowa, pomidorki cherry</p>
                <p className="text-xl font-bold text-green-500">25 zł</p>
            </div>
        </div>
        </div>
        </div>
        </div>
        </section>
<footer className="bg-green-500 py-8 text-white">
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