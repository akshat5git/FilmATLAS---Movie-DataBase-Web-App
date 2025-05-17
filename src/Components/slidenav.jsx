import React, { useEffect, useRef } from 'react'
import { ReactTyped } from "react-typed";
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

export const Slidenav = ({ menu, setmenu }) => {
  const navRef = useRef(null);

  useEffect(() => {
    if (menu) {
      navRef.current.classList.add('opacity-100', 'translate-x-0');
    } else {
      navRef.current.classList.remove('opacity-100', 'translate-x-0');
    }
  }, [menu]);

  return (
    <div
      ref={navRef}
      className={`relative min-h-screen max-h-screen border-r border-zinc-800 bg-zinc-900 shadow-lg overflow-hidden
      transition-all duration-500 ease-in-out transform opacity-0 -translate-x-full ${menu ? `w-[20%]` : `w-0`}`}
    >
      {/* Header */}
      <div className='flex flex-col items-center pt-7'>
        <div className='relative right-1 flex flex-col items-center transition-all duration-500 ease-in-out'>
          <i className="text-[#6556CD] ri-tv-fill text-[40px] mb-2"></i>
          <span className='text-white font-extrabold text-2xl tracking-wide'><ReactTyped strings={["FilmATLAS.","MOVIE.","TV."]} typeSpeed={120} backSpeed={120} loop /></span>
        </div>

        <i
          onClick={() => setmenu(false)}
          className="ri-close-fill absolute text-white right-7 text-xl cursor-pointer hover:bg-slate-700 rounded-full px-1 transition-all duration-300 ease-in-out"
        ></i>
      </div>

      {/* Navigation Links */}
      <nav className='mt-10 px-2'>
        <ul className='space-y-2'>
          {[
            { path: '/trending', label: 'Trending', icon: 'ri-fire-fill' },
            { path: '/popular', label: 'Popular', icon: 'ri-star-fill' },
            { path: '/movies', label: 'Movies', icon: 'ri-film-fill' },
            { path: '/series', label: 'Series', icon: 'ri-play-circle-fill' },
            { path: '/people', label: 'People', icon: 'ri-user-fill' },
            { path: '/favourites', label: 'Favourites', icon: 'ri-heart-fill' }
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className='flex items-center gap-3 text-white text-lg px-5 font-bold p-3 rounded-lg 
                hover:bg-[#6556CD] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105'
              >
                <i className={`${item.icon} text-lg text-yellow-300`}></i> {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Links */}
      <div className='mt-auto px-2 pb-10'>
        <hr className='border-zinc-700 my-3' />
        <ul className='space-y-2'>
          {[
            { path: '/settings', label: 'Contact Us', icon: 'ri-customer-service-2-fill' },
            { path: '/help', label: 'Help', icon: 'ri-question-fill' }
          ].map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className='flex items-center gap-3 text-white text-lg px-5 font-semibold p-3 rounded-lg 
                hover:bg-[#6556CD] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105'
              >
                <i className={`${item.icon} text-lg text-yellow-100`}></i> {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
