import React, { useState , useEffect } from 'react'
import {fetchDailyData} from '../../api/'
import { Line, Bar } from 'react-chartjs-2'
import Loading from '../../components/Loading/Loading'

export default function Charts(props) {
    
    const {confirmed, recovered, deaths} = props.data
    const country = props.country

    const [dailyData , setDailyData] = useState({}) 

    useEffect(()=>{
        const fetchApi = async ()=>{
            setDailyData( await fetchDailyData())
        }
        
        fetchApi()
    },[])

    if(confirmed === undefined){
        return <Loading/>
    }

    console.log(confirmed.value,recovered.value,deaths.value)

    const barChart = (
        confirmed ? ( <Bar 
            data={{
                labels: ['Confirmed', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: ['rgb(155, 90, 155)','rgb(34, 153, 34)','rgb(216, 66, 66)'],
                    data: [confirmed.value,recovered.value,deaths.value]
                }],
                
            }}
            options={{
                legend: {display:false},
                title: {display: true, text: `Current stats in ${country}`}
            }}
        />) : null
    )

    const lineChart = (
        dailyData[0] ? (<Line
            data={{
                labels: dailyData.map(({date}) => date),
                datasets: [
                    {
                        data: dailyData.map(({confirmed})=> confirmed),
                        labels: "Confirmed",
                        borderColor: "purple",
                        fill: true
                },{
                    data: dailyData.map(({deaths})=> deaths),
                    labels: "Deaths",
                    borderColor: "rgb(216, 66, 66)",
                    backgroundColor: 'rgb(216, 66, 66,.5)',
                    fill: true
                }]
            }}
        />) : null
    )

    return (
        <div>
            {country ? barChart : lineChart}
        </div>
    )
}
