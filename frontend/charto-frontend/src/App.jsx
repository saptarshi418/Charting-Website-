import React from 'react'
import NavBar from './components/NavBar'
import Library from './pages/Library'
import ChartView from './pages/ChartView'
import Register from './pages/Register'
import Login from './pages/Login'
import VerifyOtp from './pages/VerifyOtp'
import {Route , Routes} from 'react-router-dom'
import MainOutlet from './components/MainOutlet'


const App = () => {
  return (
    <div className='bg-[#0A0C0F] h-full w-full'>
      <Routes>
        <Route path='/' element={<MainOutlet />}>
          <Route path='/upload' element={<Library />} />
          <Route path="/chart/:datasetId/" element={<ChartView />}/>
          

        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-otp/:purpose' element={<VerifyOtp/>} />
      </Routes>
    </div>
  )
}

export default App