import React from 'react'

const TopPart = () => {
  return (
    <div className='text-white flex w-full items-center justify-around bg-[#0F1217]'>
      <p>Name</p>
      <div className='flex flex-col'>
        
        <div className='flex items-center gap-2 py-2'>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded'>1M</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded'>1M</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded'>1M</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded'>1M</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded'>1M</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded'>1M</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded'>1M</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded'>1M</p>
          <p className='px-2 py-0.5 text-sm bg-[#1f2434] rounded'>1M</p>
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