import React from 'react'
import CardKpi from './Library_card/CardKpi'

const CardList = ({kpis}) => {
  return (
    <div className='gap-4 flex flex-wrap pl-4 pr-4 '>
        <CardKpi kpis={kpis}/>
    </div>
  )
}

export default CardList