import React, {useEffect , useState} from 'react'
import {Form ,Col} from 'react-bootstrap'
import { countryList } from '../../api'
import './CountryPicker.css'
export default function CountryPicker(props) {
    
    const handle = props.handlecountry
    
    const [fetchcountries, setfetchedcountries] = useState([])

        useEffect(()=>{
            const fetchedcountries = async () => {
                setfetchedcountries(await countryList())
            }
            fetchedcountries()
        },[])

        console.log(fetchcountries)

    return (
        <div>
            <Form.Group as={Col} >
                <Form.Label>Select</Form.Label>
                <Form.Control id="formcontrol" as="select" defaultValue="" onChange={(e) => handle(e.target.value)}>
                    <option value="">Global</option>
                    {fetchcountries.map((country,index)=> <option key={index} value={country}>{country}</option>)}
                </Form.Control>
            </Form.Group>
        </div>
    )
}
