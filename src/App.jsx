import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Link,Route , Routes ,Outlet } from 'react-router-dom'
import Home from './Components/Home'
import TrendingMovies from './Components/TrendingMovies'
import { Popular } from './Components/Popular'
import { Trending } from './Components/Trending'
import { Movies } from './Components/Movies'
import { Series } from './Components/Series'
import { TrendingSeries } from './Components/TrendingSeries'
import { Trailer } from './Components/Trailer'
import { People } from './Components/People'
import Persondeatils from './Components/Persondetails'

function App() {
  return (
  <div className='bg-[#1F1E24] h-screen w-screen flex'>
  <Routes>
    <Route path='/' element ={<Home />} />
      <Route path='/view/movie/:ID' element={<TrendingMovies />}>
      <Route path='/view/movie/:ID/Trailer' element={<Trailer />} />
      </Route>
      <Route path='/view/tv/:ID' element={<TrendingSeries />} >
      <Route path='/view/tv/:ID/Trailer' element={<Trailer />} />
      </Route>
      <Route path='/view/person/:ID' element={<Persondeatils/>} />
      <Route path='/popular' element={<Popular />} />
      <Route path='/trending' element={<Trending />} />
      <Route path='/movies' element={<Movies />} />
      <Route path='/series' element={<Series />} />
      <Route path='/people' element={<People />} />

  </Routes>
  </div>
  )
}
export default App
