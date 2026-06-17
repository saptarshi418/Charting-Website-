import React from 'react'

const CardKpi = ({kpis}) => {
    // row val
    let row_value = 0
    if(kpis.total_rows > 1000000){
        row_value = kpis.total_rows/1000000;
        row_value = parseFloat(row_value.toFixed(2))
        row_value = `${row_value} M`
    }else if(kpis.total_rows > 1000){
        row_value = kpis.total_rows/1000;
        row_value = parseFloat(row_value.toFixed(2))
        row_value = `${row_value} K`
    }else{
        row_value = kpis.total_rows
    }
    // space used
    let storage_value = 0
    if(kpis.total_storage_used){
        storage_value =kpis.total_storage_used
        storage_value = parseFloat(storage_value.toFixed(2))
    }
    // last file update time format change
    
    const formatTimeAgo = (time)=>{
       

        if (!time) return "";

        return time
            .replace(/,\s*/g," ")
            .replace(/hours?/g,"h")
            .replace(/minutes?/g,"min")
            .replace(/seconds?/g,"s")
            .replace(/days?/g,"d")
    }
   

  return (
    <div className='w-screen flex gap-2 flex-wrap'>
        <div className='bg-[#0F1217] h-26 w-xs text-gray-600 text-xs flex flex-col justify-center p-2 rounded-2xl font-medium'>
            <p>Total Datasets</p>
            <p className='text-white text-2xl font-bold'>{kpis.dataset_count}</p>
            <p>3 uploaded this month</p>
        </div>
        <div className='bg-[#0F1217] h-26 w-xs text-gray-600 text-xs flex flex-col justify-center p-2 rounded-2xl font-medium'>
            <p>Total Rows</p>
            <p className='text-white text-2xl font-bold'>{`${row_value}`}</p>
            <p>Across all files </p>
        </div>
        <div className='bg-[#0F1217] h-26 w-xs text-gray-600 text-xs flex flex-col justify-center p-2 rounded-2xl font-medium'>
            <p>Storage Used</p>
            <p className='text-white text-2xl font-bold'>{`${storage_value}MB`}</p>
            <p>of 500 MB</p>
        </div>
        <div className='bg-[#0F1217] h-26 w-xs text-gray-600 text-xs flex flex-col justify-center p-2 rounded-2xl font-medium'>
            <p>Last Upload</p>
            <p className='text-white text-2xl font-bold'>{formatTimeAgo(kpis.last_uploaded_dataset.uploaded_ago)}</p>
            <p>{kpis.last_uploaded_dataset.name}</p>
        </div>
    </div>
  )
}

export default CardKpi