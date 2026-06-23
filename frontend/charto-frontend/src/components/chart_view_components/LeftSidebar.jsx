import React from 'react'

const LeftSidebar = () => {
  return (
    <div className='min-h-[85vh] w-3xs bg-[#0F1217] border-r-2 border-gray-700 flex flex-col gap-4 p-2  '>
      <p>Indecators</p>
      <div className='flex flex-col gap-2'>
        <div className='bg-[#0F1217] border-2 rounded pl-2 py-1 border-gray-700 hover:cursor-pointer'>
          ndkc
        </div>
        <div className='bg-[#0F1217] border-2 rounded pl-2 py-1  border-gray-700 hover:cursor-pointer'>
          ndkc
        </div>
        <div className='bg-[#0F1217] border-2 rounded pl-2 py-1 border-gray-700 hover:cursor-pointer'>
          ndkc
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar