import React from 'react'

const TopPart = ({getTimeframe}) => {
  

  return (
    <div className='text-white flex w-full items-center justify-around bg-[#0F1217]'>
      <p>Name</p>
      <div className='flex flex-col'>
        
        <div className='flex items-center gap-2 py-2'>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded hover:cursor-pointer'  onClick={()=>getTimeframe("1M")}>1M</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded hover:cursor-pointer'  onClick={()=>getTimeframe("5M")}>5M</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded hover:cursor-pointer'  onClick={()=>getTimeframe("15M")}>15M</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded hover:cursor-pointer'  onClick={()=>getTimeframe("30M")}>30M</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded hover:cursor-pointer'  onClick={()=>getTimeframe("1H")}>1H</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded hover:cursor-pointer'  onClick={()=>getTimeframe("4H")}>4H</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded hover:cursor-pointer'  onClick={()=>getTimeframe("1D")}>1D</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded hover:cursor-pointer'  onClick={()=>getTimeframe("1W")}>1W</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded hover:cursor-pointer'  onClick={()=>getTimeframe("1MO")}>1MO</p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded'>CandelStick</p>
        <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded'>Line</p>
      </div>

    </div>
  )
}

export default TopPart