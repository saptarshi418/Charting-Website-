  import React, { useEffect, useState } from 'react'
  import { useParams } from "react-router-dom"
  import TopPart from '../components/chart_view_components/TopPart'
  import LeftSidebar from '../components/chart_view_components/LeftSidebar'
  import Chart from '../components/chart_view_components/Chart'
  import RightSidebar from '../components/chart_view_components/RightSidebar'
  import api from '../services/api'

  const ChartView = () => {
      const {datasetId} = useParams()
      const [title, setTitle] = useState(null)
      const [chartData, setChartData] = useState(null)
      const [loading, setLoading] = useState(true)
      const [aggregateValue, setAggregateValue] = useState(null)


      const changeAggValue = (value)=>{
        setAggregateValue(value)
      }
      
      // 1st load data
      useEffect (()=>{
        (async ()=>{
          try {
            // setLoading(true)
            let url = `/user/dataset-chart/${datasetId}/`
            if (aggregateValue){
              url = url +`?timeframe=${aggregateValue}`
            }
            const response = await api.get(url)
            // console.log(response.data);
            
            setChartData(response.data.data)
            setTitle(response.data.data_title)
            
          } catch (error) {
            console.log(error);
            
          }finally{
            setLoading(false)
          }

        })()
      },[datasetId , aggregateValue])


    
    return (
      <div className='text-white h-full w-full'>
        
          <TopPart getTimeframe={changeAggValue} />
          <div className='min-h-full w-full flex gap-2'>
            <LeftSidebar/>
            {
              loading 
              ? <div>Loading data ...</div>
              :<Chart data={chartData} data_title = {title}/>
            }
            <RightSidebar/>
          </div>
      </div>
    )
  }

  export default ChartView