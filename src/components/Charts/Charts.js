import React, { useState , useEffect } from 'react'
import {fetchDailyData} from '../../api/'
import {  Carousel } from 'react-bootstrap'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
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
    let activecases = confirmed.value-(recovered.value+deaths.value)
    
    console.log(confirmed.value,activecases,recovered.value,deaths.value)

    const barChart = (
        confirmed ? ( <Bar 
            data={{
                labels: ['Confirmed','Active Cases','Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: ['rgb(155, 90, 155)','yellow','rgb(34, 153, 34)','rgb(216, 66, 66)'],
                    data: [confirmed.value,activecases,recovered.value,deaths.value]
                }],
                
            }}
            options={{
                legend: {display:false},
                title: {display: true, text: `Current stats in ${country}`}
            }}
        />) : null
    )

    const doughnut = (
        confirmed ? (<Doughnut
                data={{
                    
                    datasets: [{
                        backgroundColor: ['rgb(155, 90, 155)','yellow','rgb(34, 153, 34)','rgb(216, 66, 66)'],
                        data: [confirmed.value,activecases,recovered.value,deaths.value]
                    }],
                    labels: ['Confirmed','Active Cases','Recovered', 'Deaths'],
                }}
            />
        ) : null 
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

    const countryWise = (
        <div>
            <Carousel>
                <Carousel.Item>
                   {barChart}
                </Carousel.Item>
                <Carousel.Item>
                    {doughnut}
                </Carousel.Item>
            </Carousel>
        </div>
    )
            
    return (
        <div>
            {country ? countryWise : lineChart}
        </div>
    )
}
