import React from 'react'
import { Trash2 } from 'lucide-react';


const RightSidebar = React.memo(({data , deleteIndecator}) => {

  console.log(data);
  
  return (
    <div className='min-h-[85vh]  w-3xs bg-[#0F1217] border-l-2 border-gray-600 flex flex-col content-center items-center p-1 pl-2'>
      <div className='flex w-full content-center items-center'>
        Active Indecators
      </div>
      <div className='h-full w-full flex flex-col content-center items-center pt-2 gap-2 hover:cursor-pointer'>

        {
          data?.map(indicators=>(
            <div key={indicators.id} className='flex gap-0.5 items-center border-2 rounded p-1 border-gray-600'>
            <div className={`h-4 w-4 rounded-full `} style={{backgroundColor: indicators.color || "#ffffff"}}/>
            <p>{indicators.indicator_name}</p>
            <Trash2 onClick={()=>deleteIndecator(indicators.id)} />
        </div>

          ))
        }
        
        

      </div>
    </div>
  )
});

export default RightSidebar