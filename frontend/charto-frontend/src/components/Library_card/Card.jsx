import React from 'react'
import CardFilter from './CardFilter'
import Card_datadetailed from './CardDataDetailed'

const Card = ({data , filterData}) => {
  return (
    <div className='flex flex-col gap-4'>
      <CardFilter filterData={filterData}/>
      <div>
        <Card_datadetailed data={data} />
      </div>
    </div>
  )
}

export default Card