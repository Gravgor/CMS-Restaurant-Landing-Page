"use client"
import './tailwind/global.css'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {AiFillCaretRight, AiFillCaretLeft} from 'react-icons/ai'

export default function Page(){

    const [currentSlide, setCurrentSlide] = useState(0)
    const [data, setData] = useState<any[]>([])
    const [dataPhotos, setDataPhotos] = useState<any[]>([])
   

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
            })
            setData(data.data)
        })
    },[])


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
        <div className="mx-auto mt-16" style={{
            maxWidth: '800px'
        }}>
        <h1 className="text-4xl font-bold text-green-700" style={{
            textAlign: 'center'
        }}>Szczaw i Mirabelki</h1>
        <h2 className="text-2xl font-semibold text-black leading-tight mb-4 text-center">Restauracja z kuchnią wegańską</h2>
        <div className='relative overflow-hidden bg-black'>
            <div className='relative z-10' style={{
                maxWidth: '800px',
                margin: '0 auto'
            }}>
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
        <div className="flex" style={{
            marginTop: '2rem'
        }}>
        <div className="w-2/3 pr-4">
          <p className="text-lg font-semibold text-black mb-4">
            {data.map((item, index) => {
                return (
                    <p key={index}>{item ? item.title : 'Ładowanie...'}</p>
                )
            })}
          </p>
          </div>
        <div className="w-1/3 pl-4">
             <h3 className="text-xl font-semibold text-black mb-2">Nasze specjalności</h3>
             <ul className="text-base text-gray-700">
                <li className="mb-2">Specjalność 1</li>
                <li className="mb-2">Specjalność 2</li>
                <li className="mb-2">Specjalność 3</li>
                <li className="mb-2">Specjalność 4</li>
            </ul>
        </div>
       </div> 
       <div className="mx-auto mt-5" style={{
    maxWidth: '800px'
  }}>
  <h2 className="text-2xl font-semibold text-black mb-4">Przykładowe dania z menu</h2>
  <div className="grid grid-cols-3 gap-4">
    <div className="flex flex-col items-center">
        <Image src="/images/dish/dish1.png" alt="Zupa szczawiowa z kluseczkami" width={300} height={200} />
      <h3 className="text-lg font-semibold text-black mb-2">Danie 1</h3>
      <p className="text-base text-gray-700 mb-2">25 zł</p>
    </div>
    <div className="flex flex-col items-center">
    <Image src="/images/dish/dish1.png" alt="Zupa szczawiowa z kluseczkami" width={300} height={200} />
      <h3 className="text-lg font-semibold text-black mb-2">Danie 2</h3>
      <p className="text-base text-gray-700 mb-2">30 zł</p>
    </div>
    <div className="flex flex-col items-center">
    <Image src="/images/dish/dish1.png" alt="Zupa szczawiowa z kluseczkami" width={300} height={200} />
      <h3 className="text-lg font-semibold text-black mb-2">Danie 3</h3>
      <p className="text-base text-gray-700 mb-2">35 zł</p>
    </div>
  </div>
       <div className="flex mt-5">
    <div className="w-1/3 pr-4">
      <h3 className="text-xl font-semibold text-black mb-2">Godziny otwarcia</h3>
      <ul className="text-base text-gray-700">
        <li className="mb-2">Niedziela - Czwartek: 9:00 - 23:00</li>
        <li className="mb-2">Piątek - Sobota: 9:00 - 02:00</li>
      </ul>
    </div>
    <div className="w-1/3 pr-4">
      <h3 className="text-xl font-semibold text-black mb-2">Adres resturacji</h3>
      {data.map((item, index) => {
        return (
            <>
            <p className="text-base text-gray-700 mb-2" key={index}>{item.address}</p>
            <p className="text-base text-gray-700 mb-2" key={index}>{item.address2}</p>
            <p className="text-base text-gray-700 mb-2" key={index}>+48 {item.phone}</p>
        <a href={item.email} className="text-base text-gray-700 mb-2">
            {item.email}
        </a>
        </>
        )
         })}
    </div>
    <div className="w-1/3">
      <h3 className="text-xl font-semibold text-black mb-2">Zobacz nasze pełne menu</h3>
      <p className="text-base text-gray-700 mb-2">Po kliknięicu w przycisk zostaniesz przekierowany do menu naszej restauracji</p>
      <a href="https://szczaw-i-mirabelki.dowozimy.pl/#menu" className="inline-block py-3 px-6 rounded-full bg-green-700 text-white font-semibold hover:bg-green-600 focus:outline-none focus:shadow-outline-green">Zobacz menu</a>
    </div>
    <div className="w-1/3 pr-6 ml-5">
        <h3 className="text-xl font-semibold text-black mb-2">Zamów online</h3>
        <p className="text-base text-gray-700 mb-2">Po kliknięciu w przycisk zostaniesz przekierowany do strony z zamówieniem online</p>
        <a href="https://szczaw-i-mirabelki.dowozimy.pl/" className="inline-block py-3 px-6 rounded-full bg-green-700 text-white font-semibold hover:bg-green-600 focus:outline-none focus:shadow-outline-green">Zamów online</a>
    </div>
  </div>
</div>
</div>
    )
}