
import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import Seats from './Seats';
import axios from 'axios';

const BookMySeats = () => {
    const {state} = useLocation();
  const {FlightID} = state;
  
  const [ecoSeats, setEcoSeats] = useState({});
  const [busSeats, setBusSeats] = useState({});
  const [firSeats, setFirSeats] = useState({});
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookedStatus, setBookedStatus] = useState('');

  const getFlight = async ()=> {
    await axios
    .get("http://localhost:5000/flights/"+ FlightID)
    .then((response) => {
    const data = response.data;

    if(data.EconomySeatsMap == undefined){
        data.EconomySeatsMap = {};
    }
    setEcoSeats(data.EconomySeatsMap);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  getFlight();

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
      bookedSeats.forEach(seat => {
           setBookedStatus(prevState => {
               return prevState + seat + ' ';
           })
      });
      const newAvailableEcoSeats = ecoSeats.filter(seat => !bookedSeats.includes(seat));
      const newAvailableBusSeats = busSeats.filter(seat => !bookedSeats.includes(seat));
      const newAvailableFirSeats = firSeats.filter(seat => !bookedSeats.includes(seat));
      setEcoSeats(newAvailableEcoSeats);
      setBusSeats(newAvailableBusSeats);
      setFirSeats(newAvailableFirSeats);

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
                    <Seats values={firSeats}
                   bookedSeats={bookedSeats}
                   addSeat={addSeat}/>
          <body>
              <br />
            <h5> Available Business Class Seats </h5>
                </body>  
            <Seats values={busSeats}
                   bookedSeats={bookedSeats}
                   addSeat={addSeat}/>           
            <body>
              <br />
            <h5> Available Economy Class Seats </h5>
                </body>  
            <Seats values={ecoSeats}
                   bookedSeats={bookedSeats}
                   addSeat={addSeat}/>
                   <button onClick={confirmBooking}>Book seats</button>
            <p>{bookedStatus}</p>
        </React.Fragment>

    );
}

export default BookMySeats;