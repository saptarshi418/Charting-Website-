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
    const [indicatorPayload, setIndicatorPayload] = useState(null)
    const [indecatorPayloadValues, setIndecatorPayloadValues] = useState([])

    const changeAggValue = (value) => {
        setAggregateValue(value)
    }

    const buildIndicatorQuery = (payload) => {
        const { indicator_name, settings } = payload
        const params = new URLSearchParams()
        params.append("indicator", indicator_name)
        Object.entries(settings).forEach(([key, value]) => {
            if (key === "color") return
            if (key === "col_name") {
                params.append("col", value)
                return
            }
            params.append(key, value)
        })
        return params.toString()
    }

    // 1st load data
    useEffect(() => {
        (async () => {
            try {
                let url = `/user/dataset-chart/${datasetId}/`
                if (aggregateValue) {
                    url = url + `?timeframe=${aggregateValue}`
                }
                const response = await api.get(url)
                setChartData(response.data.data)
                setTitle(response.data.data_title)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [datasetId, aggregateValue])

    // get indicator data from backend
    useEffect(() => {
        (async () => {
            if (!indicatorPayload) return
            try {
                let url = `/user/dataset-chart/${datasetId}/?`
                if (aggregateValue) {
                    url = url + `timeframe=${aggregateValue}&`
                }
                let query = buildIndicatorQuery(indicatorPayload)
                url = url + query

                const data = await api.get(url)
                setIndecatorPayloadValues(prev => [
                    ...prev,
                    {
                        id: indicatorPayload.id,
                        indicator_name: indicatorPayload.indicator_name,
                        settings: indicatorPayload.settings,
                        color: indicatorPayload.settings.color,
                        column_names: data.data.columns,
                        values: data.data.values
                    }
                ])
            } catch (error) {
                console.log(error)
            }
        })()
    }, [indicatorPayload])

    const removeIndecatorHandler = (id) => {
        setIndecatorPayloadValues(prev =>
            prev.filter(item => item.id !== id)
        )
    }

    return (
        <div className='text-white h-full w-full'>
            <TopPart getTimeframe={changeAggValue} />
            <div className='min-h-full w-full flex gap-2'>
                <LeftSidebar indPayload={(payload) => { setIndicatorPayload(payload) }} />
                {
                    loading
                        ? <div>Loading data ...</div>
                        : <Chart
                            data={chartData}
                            data_title={title}
                            indecatorData={indecatorPayloadValues}
                          />
                }
                <RightSidebar
                    data={indecatorPayloadValues}
                    deleteIndecator={removeIndecatorHandler}
                />
            </div>
        </div>
    )
}

export default ChartView