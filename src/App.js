import React, { Component } from 'react'
import Cards from './components/Cards/Cards'
import Charts from './components/Charts/Charts'
import Heading from './components/Heading/Heading'
import CountryPicker from './components/CountryPicker/CountryPicker'
import { fetchData } from './api'
import './App.css'
import { Row, Container,Col } from 'react-bootstrap'

class App extends Component {
  
  constructor(props) {
    super(props)
  
    this.state = {
       data: {},
       country: ''
    }
  }
  

  async componentDidMount(){
    const fetchedData = await fetchData()
    this.setState({
      data: fetchedData
    })
  }   

  handleCountry = async (country) => {
    
    if(country===''){
      const countryFetchData= await fetchData()
       this.setState({data:countryFetchData,country:''})
       return;
     }
    const countryFetchData = await fetchData(country) 
    // fetch country

    this.setState({
      data: countryFetchData,
      country: country
    })

  }
  
  render() {
    return (
      <div className="App py-3">
        <Container><Heading/>
          <Row className="align-items-center">
            <Col xs={12} lg={3}>
              <Cards data={this.state.data} />
            </Col>
            <Col xs={12} lg={9}>
              
              <CountryPicker handlecountry={this.handleCountry}/>
              <Charts data={this.state.data} country={this.state.country}/>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App
