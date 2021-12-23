
import React, {useState} from 'react';
import Seats from './Seats';
import axios from 'axios';

var FlightID= sessionStorage.getItem("FlightID");

const BookMySeats = () => {
const getFlightByID = async ()=>{ 
    await axios
    .get("http://localhost:5000/flights/" + FlightID)
    .then((response) => {
        setEconomySeats(response.data.EconomySeatsAvail);
        setBusinessSeats(response.data.EconomySeatsAvail);
        setEconomySeats(response.data.EconomySeatsAvail);
    })
    .catch(function (error) {
        console.log(error);
    });
}

  const [economySeats, setEconomySeats] = useState([]);
  const [firstSeats, setFirstSeats] = useState([]);
  const [businessSeats, setBusinessSeats] = useState([]);

  const [bookedSeats, setBookedSeats] = useState([]);

  const [bookedStatus, setBookedStatus] = useState('');

  const addSeat = (ev) => {
      if(numberOfSeats && !ev.target.className.includes('disabled')) {        
          const seatsToBook = parseInt(numberOfSeats, 10);
        if(bookedSeats.length <= seatsToBook) {
            if (bookedSeats.includes(ev.target.innerText)) {
                const newAvailable = bookedSeats.filter(seat => seat !== ev.target.innerText);
                setBookedSeats(newAvailable);
            } else if(bookedSeats.length < numberOfSeats) {
                setBookedSeats([...bookedSeats, ev.target.innerText]);
            } else if (bookedSeats.length === seatsToBook) {
                bookedSeats.shift();
                setBookedSeats([...bookedSeats, ev.target.innerText]);
            }
        }
      }
    };

  React.useEffect(() => {
    // Runs after the first render() lifecycle
    getFlightByID();
  }, []);

  const confirmBooking = () => {
      setBookedStatus('You have successfully booked the following seats:');
      window.location.replace("http://localhost:3000/flights/users/return")
      bookedSeats.forEach(seat => {
           setBookedStatus(prevState => {
               return prevState + seat + ' ';
           })
      });
    sessionStorage.setItem("EcoSeats", economySeats);
    sessionStorage.setItem("BusSeats", businessSeats);
    sessionStorage.setItem("FirSeats", firstSeats);

      let newAvailableSeats = economySeats.filter(seat => !bookedSeats.includes(seat));
      setEconomySeats(newAvailableSeats);
      newAvailableSeats = businessSeats.filter(seat => !bookedSeats.includes(seat));
      setBusinessSeats(newAvailableSeats);
      newAvailableSeats = firstSeats.filter(seat => !bookedSeats.includes(seat));
      setFirstSeats(newAvailableSeats);
      setBookedSeats([]);
      setNumberOfSeats(0);
  };
  const [numberOfSeats, setNumberOfSeats] = useState(0);

  return (
        <React.Fragment>
            <p>How many seats would you like to book?</p>
            <input value={numberOfSeats} onChange={(ev) => setNumberOfSeats(ev.target.value)}/>
            <body>
              <br />
            <h5> Available First Class Seats </h5>
                </body>        
                    <Seats values={firstSeats}
                   bookedSeats={bookedSeats}
                   offset={0}
                   addSeat={addSeat}/>
          <body>
              <br />
            <h5> Available Business Class Seats </h5>
                </body>  
            <Seats values={businessSeats}
                   bookedSeats={bookedSeats}
                   offset={firstSeats.length}
                   addSeat={addSeat}/>           
            <body>
              <br />
            <h5> Available Economy Class Seats </h5>
                </body>  
            <Seats values={economySeats}
                   bookedSeats={bookedSeats}
                   offset={firstSeats.length + businessSeats.length}
                   addSeat={addSeat}/>

                   <button onClick={confirmBooking}>Book seats</button>
            <p>{bookedStatus}</p>
        </React.Fragment>

    );
}

export default BookMySeats;