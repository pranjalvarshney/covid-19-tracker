import axios from 'axios'

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {

    let newUrl = url

    if(country === undefined){
        newUrl = url
    }else{
        newUrl = `${url}/countries/${country}`
    }
    try {
        
        // ------------Method 1 ---------------
        // const response = await axios.get(url)
        // const data = response.data
        // const modifiedData = {
        //     confirmed : data.confirmed,
        //     recovered : data.recovered,
        //     deaths : data.deaths,
        //     lastUpdated : data.lastUpdate,     
        // }
        // return modifiedData

        // ------------Method 2 ---------------
        // const {data} = await axios.get(url)
        // const responseData = {
        //     confirmed : data.confirmed,
        //     recovered : data.recovered,
        //     deaths : data.deaths,
        //     lastUpdated : data.lastUpdate,
        // }            
        // return responseData

        // ------------Method 3 ----------------
        const { data : {confirmed, recovered, deaths ,lastUpdate} } = await axios.get(newUrl)
        const modifiedData = {confirmed, recovered, deaths ,lastUpdate}
        return modifiedData
        
    } catch (error) {
        return "Error - something went wrong"
    }
}

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`)
        
        const modifiedData = data.map((dailydata)=>({
            confirmed: dailydata.confirmed.total,
            deaths: dailydata.deaths.total,
            date: dailydata.reportDate,
        }))

        return modifiedData
    } catch (error) {
        return "Error - something went wrong"    
    }
} 

export const countryList = async () =>{
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`)
        return countries.map((country)=>country.name)
    } catch (error) {
        return "Error - something went wrong"
    }
}