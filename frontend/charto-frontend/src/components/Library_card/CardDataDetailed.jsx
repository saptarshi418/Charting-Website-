  import React from 'react'
  import { useNavigate } from 'react-router-dom'
  import { IconChartCandle, IconBuilding, IconCurrencyBitcoin, IconCurrencyDollar , IconBarrel  } from '@tabler/icons-react'





  const DatasetIcon = ({ icon: Icon, color, bg }) => (
    <div style={{
      width: 36,
      height: 36,
      borderRadius: 9,
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color,
    }}>
      <Icon size={18} stroke={1.5} />
    </div>
  )

  const CardDataDetailed = ({data}) => {
    // console.log(data);
    const navigate = useNavigate()
    const openChart = (id) =>{
      navigate(`/chart/${id}`)
    }
    
    return (
      <div className='flex gap-5 overflow-x-auto whitespace-nowrap scrollBarHideClass '>
        {data.map((data)=>(
          <div key={data.id} onClick={() => openChart(data.id)} className='flex flex-col min-h-38 w-2xs bg-[#0F1217] rounded-2xl p-3 gap-2 shrink-0'>
              <div className=' flex justify-between  rounded-2xl '>
                  <DatasetIcon icon={IconBarrel} color="#00d4a8" bg="rgba(0,212,168,0.12)" />
                  <p className='h-6 px-2 bg-[#172743] text-gray-500 text-xs rounded-xs flex items-center justify-center '>{data.data_type}</p>
              </div>
              <div>
                <p className='font-medium text-white '>{data.name}</p>
                <div className='flex gap-2'>
                  <p className='text-gray-500 text-xs'>Uploaded 2hrs ago</p>
                  {/* <p className='text-gray-500 text-xs'>. XLSX</p> */}
                </div>
              </div>
              <div className='flex gap-4 text-xs text-gray-500'>
                <div>
                  <p>Rows</p>
                  <p className='font-medium text-white'>{data.rows_count}</p>
                </div>  
                <div>
                  <p>Period</p>
                  <p className='text-white font-medium'>jan2022 - feb2023</p>
                </div>
                <div>
                  <p>TF</p>
                  <p className='font-medium text-white'>{data.timeframe}</p>
                </div>
              </div>

          </div>
        )
          
  )}
        
          
      </div>
    )
  }

  export default CardDataDetailed