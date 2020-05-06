import React from 'react'
import { Card, Row } from 'react-bootstrap';
import CountUp from 'react-countup'
import './Cards.css'
import Loading from '../Loading/Loading';

export default function Cards(props) {
    const datas = props.data    
    
    if(datas.confirmed === undefined){
        console.log("loading")
        return <Loading/>
    }
    const {confirmed, recovered, deaths, lastUpdate} = datas

    return (
        <div className="allcards my-0 ">
             <Row>
                <p className="mx-auto my-0"> Last Update</p>
                </Row>
            <Row className="" id="lastupdated">
            <p className="mx-auto my-0"> {new Date(lastUpdate).toDateString()}</p>
                </Row>
               
                <Row className="mx-auto">
                    <Card className="text-center" id="confirmed-card">
                        <Card.Body>
                        <Card.Title>Confirmed</Card.Title>
                        <Card.Text>
                            <b><CountUp 
                                start={0}
                                end={confirmed.value}
                                duration={2}
                                separator=","
                                /></b>
                            </Card.Text>
                        <Card.Text>
                            <small className="text-muted">Number of active cases of COVID-19</small>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="mx-auto">
                    <Card className="text-center" id="recovered-card">
                        <Card.Body>
                        <Card.Title>Recovered</Card.Title>
                        <Card.Text>
                        <b><CountUp 
                                start={0}
                                end={recovered.value}
                                duration={2}
                                separator=","
                               /></b>
                            </Card.Text>
                        <Card.Text>
                            <small className="text-muted">Number of recovered cases of COVID-19</small>
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="mx-auto">
                    <Card className="text-center" id="deaths-card">
                        <Card.Body>
                        <Card.Title>Deaths</Card.Title>
                        <Card.Text>
                            <b><CountUp 
                                start={0}
                                end={deaths.value}
                                duration={2}
                                separator=","
                                /></b>
                            </Card.Text>         
                            <small className="text-muted">Number of death cases of COVID-19</small>
                        </Card.Body>
                    </Card>
                </Row>
                
        </div>
    )
}
