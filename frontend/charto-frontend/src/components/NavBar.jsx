import React from 'react'

const NavBar = () => {
  return (
    <div className='bg-[#0A0C0F] border-b border-gray-800'>
        <div className='flex pl-4 pr-4 h-14 items-center'>
            <div className=' flex w-screen items-center text-gray-500 '>
                <h2 className='mr-3.5 text-2xl pb-1.25'>ChartMaster</h2>
                <p className='navbar_button text-sm outline-none'>Chart</p>
                <p className='navbar_button text-sm outline-none'>Library</p>
                <p className='navbar_button text-sm outline-none'>Indicators</p>
                <p className='navbar_button text-sm outline-none'>Bookmarks</p>
                <p className='navbar_button text-sm outline-none'>Pricing</p>
            </div>
            <p>Profile</p>  
        </div>

    </div>
  )
}

export default NavBar