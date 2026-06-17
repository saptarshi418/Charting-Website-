import React from 'react'
import Card from './Library_card/Card'

const LibBottom = ({data ,filterData}) => {
  return (
    <div className='pl-4 pr-4'>
        <Card data={data} filterData={filterData}/>
    </div>
  )
}

export default LibBottom