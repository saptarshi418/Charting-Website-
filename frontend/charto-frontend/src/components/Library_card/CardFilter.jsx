import React from 'react'

const CardFilter = ({filterData}) => {
  
  
  return (
    <div className='flex gap-4'>
        <p className='font-medium text-xs text-gray-600 h-6 px-2 bg-[#0F1217] rounded-2xl flex items-center
         justify-center outline-1 hover:cursor-pointer active:outline-green-500 transition-all duration-300
          active:shadow-[inset_0_0_40px_rgba(6,182,212,0.15)] active:text-gray-300'>All</p> 
          {filterData.map((filterData)=>(
            <p key={filterData} value={filterData} className='font-medium text-xs text-gray-600 h-6 px-2 bg-[#0F1217] rounded-2xl flex items-center
         justify-center outline-1 hover:cursor-pointer active:outline-green-500 transition-all duration-300
          active:shadow-[inset_0_0_40px_rgba(6,182,212,0.15)] active:text-gray-300'>{filterData}</p>
          ))}           
    </div>
  )
}

export default CardFilter