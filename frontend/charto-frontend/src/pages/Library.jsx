import React, { useEffect, useState } from 'react'
import FileUpload from '../components/FileUpload'
import CardList from '../components/CardList'
import LibBottom from '../components/LibBottom'
import api from '../services/api'

const Library = () => {
  // const [loading, setLoading] = useState(false)
  const [kpis, setKpis] = useState(null)  
  const [datasets, setDatasets] = useState([])
  const [filter, setFilter] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(()=>{

   
      (
        async ()=>{

            try {
              const response = await api.get("/user/dataset/")
              setKpis(response.data.kpis)
              setDatasets(response.data.result)
              setFilter(response.data.kpis.used_data_types)
              // console.log(response.data);  
              // console.log(response.data.result);
              
            } catch (error) {
              console.log(error.response)
              
            }finally{
              setLoading(false)
            }

  
        }
      )()
    
     
      
    
  },[])

  if(loading){
      return(<div>
        <h1>Loading....</h1>
      </div>)
    }
  


  return (
    <div className='gap-4 flex flex-col pb-6'>
        <div className='p-4 text-white flex flex-col items-center'>
            <h1 className='font-extrabold text-4xl'>Data Library</h1>
            <p className='text-gray-600 font-medium text-sm'>Upload , manage and view your candelstick</p>
        </div>
      <FileUpload />
      <CardList  kpis={kpis}/>
      <LibBottom data={datasets} filterData={filter} />

    </div>
  )
}

export default Library