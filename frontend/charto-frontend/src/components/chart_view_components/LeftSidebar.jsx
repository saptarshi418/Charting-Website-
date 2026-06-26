import React, { useState } from 'react'
import CardIndecator from './CardIndecator'

const LeftSidebar = ({indPayload}) => {
  const [popup, setPopup] = useState(false)
  const [selected, setSelected] = useState(null)
  

  const updatePopup = ()=>{
    setPopup(true)
  }
  return (
    <div className='min-h-[85vh] w-3xs bg-[#0F1217] border-r-2 border-gray-700 flex flex-col gap-4 p-2 '>
      <p>Indecators</p>
      <div className='flex flex-col gap-2'>
        <div className='bg-[#0F1217] border-2 rounded pl-2 py-1 border-gray-700 hover:cursor-pointer' onClick={()=>{
          setPopup(true)
          setSelected("SMA")}} > 
          SMA
        </div>
        <div className='bg-[#0F1217] border-2 rounded pl-2 py-1  border-gray-700 hover:cursor-pointer' onClick={()=>{
          setPopup(true)
          setSelected("EMA")}}>
          EMA
        </div>
        <div className='bg-[#0F1217] border-2 rounded pl-2 py-1 border-gray-700 hover:cursor-pointer' onClick={()=>{
          setPopup(true)
          setSelected("RSI")}}>
          RSI
        </div>
        <div className='bg-[#0F1217] border-2 rounded pl-2 py-1 border-gray-700 hover:cursor-pointer' onClick={()=>{
          setPopup(true)
          setSelected("SUPERTREND")}}>
          SUPERTREND
        </div>
        {popup && <CardIndecator indPayload={indPayload} clickedIndecator={selected} close={()=>{setPopup(false)}}/>}
      </div>
    </div>
  )
}

export default LeftSidebar