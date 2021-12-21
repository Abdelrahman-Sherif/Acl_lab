
import React, {useState} from 'react';
import Seats from './Seats';
var airportTakeoff= sessionStorage.getItem("airportTakeoff");
var airportArrival= sessionStorage.getItem("airportArrival");
var DepartureFlightNumber= sessionStorage.getItem("DepartureFlightNumber");

console.log(airportTakeoff);
console.log(airportArrival);
console.log(DepartureFlightNumber);

const BookMySeats = () => {
  const {state} = useLocation();
  const {EconomySeatsMap, BusinessSeatsMap, FirstSeatsMap} = state;
  
  const [ecoSeats, setEcoSeats] = useState({});
  const [busSeats, setBusSeats] = useState({});
  const [firSeats, setFirSeats] = useState({});
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

  const confirmBooking = () => {
      setBookedStatus('You have successfully booked the following seats:');
      window.location.replace("http://localhost:3000/flights/users/return")
      bookedSeats.forEach(seat => {
           setBookedStatus(prevState => {
               return prevState + seat + ' ';
           })
      });
      const newAvailableSeats = availableSeats.filter(seat => !bookedSeats.includes(seat));
      setAvailableSeats(newAvailableSeats);
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
                    <Seats values={firstClassSeats}
                   availableSeats={availableSeats}
                   bookedSeats={bookedSeats}
                   addSeat={addSeat}/>
          <body>
              <br />
            <h5> Available Business Class Seats </h5>
                </body>  
            <Seats values={BusinessClassSeats}
                   availableSeats={availableSeats}
                   bookedSeats={bookedSeats}
                   addSeat={addSeat}/>           
            <body>
              <br />
            <h5> Available Economy Class Seats </h5>
                </body>  
            <Seats values={economySeats}
                   availableSeats={availableSeats}
                   bookedSeats={bookedSeats}
                   addSeat={addSeat}/>

           
                   <button onClick={confirmBooking}>Book seats</button>
            <p>{bookedStatus}</p>
        </React.Fragment>

    );
}

export default BookMySeats;