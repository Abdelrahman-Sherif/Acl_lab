import React , {useState , useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import '../css/createflights.css'
const FlightCreate = ({history}) => {
    const [FlightNumber , setFlightNumber] = useState('');
    const [DepartureTime , setDepartureTime] = useState('');
    const [DateTakeoff , setDateTakeoff] = useState('')
    const [DateArrival , setDateArrival] = useState('')
    const [EconomySeats , setEconomySeats] = useState('');
    const [BusinessSeats , setBusinessSeats] = useState('');
    const [AirportArrival , setAirportArrival] = useState('');
    const [AirportTakeOff , setAirportTakeOff] = useState('');
  

    const dispatch = useDispatch();

    const AddFlight = useSelector(state => state.addFlight);
    const {success , loading } = AddFlight

    useEffect(() => {
        if(success){
            history.push('/admin/flights');
            dispatch(loadFlights());
            dispatch({type : FLIGHT_ADD_RESET})
        }
    } , [ dispatch , success])

        const handleAdd = () => {
        dispatch(addFlight({FlightNumber,DepartureTime,DateTakeoff,DateArrival,EconomySeats,BusinessSeats ,AirportArrival,AirportTakeOff}))
    }

    return (
        <>
            <section id="addFlight">
                <p className="title">Add Flight</p>
                <div className="msg-container">
                </div>
                <div className="FlightNumber-container">
                    <label className="name-label">FlightNumber</label>
                    <input type="text" onChange={(e) => setFlightNumber(e.target.value)} value={FlightNumber} placeholder="FlightNumber" htmlFor="FlightNumber" />
                </div>

                <div className="DepartureTime-container">
                    <label className="DepartureTime-label">DepartureTime</label>
                    <input type="text" onChange={(e) => setDepartureTime(e.target.value)} value={DepartureTime} placeholder="DepartureTime" htmlFor="DepartureTime" />
                </div>

                <div className="DateTakeoff-container">
                    <label className="DateTakeoff-label">on Boarding Place</label>
                    <input type="text" onChange={(e) => setDateTakeoff(e.target.value)} value={DateTakeoff} placeholder="DateTakeoff" />
                </div>
                <div className="AirportArrival-container">
                    <label className="AirportArrival-label">AirportArrival</label>
                    <input type="text" onChange={(e) => setAirportArrival(e.target.value)} value={AirportArrival} placeholder="AirportArrival" htmlFor="AirportArrival" />
               
                </div><div className="AirportTakeOff-container">
                    <label className="AirportTakeOff-label">AirportTakeOff</label>
                    <input type="text" onChange={(e) => setAirportTakeOff(e.target.value)} value={AirportTakeOff} placeholder="AirportTakeOff" htmlFor="AirportTakeOff" />
                </div>
                
                <div className="DateArrival-container">
                    <label className="fromDate-label">OnBoarding Date</label>
                    <input type="Date" onChange={(e) => setDateArrival((e.target.value))} value={DateArrival} placeholder="DateArrival" />
                </div>
               
                
                <div className="EconomySeats-container">
                    <label className="EconomySeats-label">EconomySeats (Rs)</label>
                    <input type="number" onChange={(e) => setEconomySeats((e.target.value))} value={EconomySeats} placeholder="EconomySeats" />
                </div>
                
                <div className="BusinessSeats-container">
                    <label className="BusinessSeats-label">BusinessSeats (Rs)</label>
                    <input type="number" onChange={(e) => setBusinessSeats((e.target.value))} value={BusinessSeats} placeholder="BusinessSeats" />
                </div>
                <button onClick={handleAdd} className="submit">ADD</button>
            </section>
        </>
    )
}

export default FlightCreate