
import React, {useState} from 'react';
import Seats from './Seats';
var airportTakeoff= sessionStorage.getItem("airportTakeoff");
var airportArrival= sessionStorage.getItem("airportArrival");
var ReturnFlightNumber= sessionStorage.getItem("ReturnFlightNumber");

console.log(ReturnFlightNumber);
console.log(airportTakeoff);
console.log(airportArrival);


const createSeats = (rows, startIndex) => {
    let i = 0; //the rows counter
    let j = startIndex; 
    let k = 'A';
    const section = [];
    while(i < 6 && j <= rows) {
        if(k > 'F') {
            k = 'A';
            j++;
        }
        if(j < rows + 1) {
            section.push(j + k);
            k = String.fromCharCode(k.charCodeAt(0) + 1);
        }
    }
    
    return section;

}




const BookMyReturnSeats = () => {
  //  const BusinessClassSeats = createSeats(2, '1');

  const firstClassSeats = createSeats(2, '1');
  const BusinessClassSeats = createSeats(5, '3');

  const economySeats = createSeats(10, '6');
  const [availableSeats, setAvailableSeats] = useState([]);
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
      window.location.replace("http://localhost:3000/flights/users/itinerary")
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

export default BookMyReturnSeats;