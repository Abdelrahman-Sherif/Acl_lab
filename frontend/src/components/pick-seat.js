
import React, {useState} from 'react';
import Seats from './Seats';
import axios from 'axios';
import queryString from 'query-string';
var FlightID= sessionStorage.getItem("FlightID");
var depFlightNumber=sessionStorage.getItem("depFlightNumber");
console.log("FlightID pick seat", FlightID);
console.log("value from url",queryString.parse(window.location.search)); 
var {flag}=queryString.parse(window.location.search);
console.log("flag", flag);

const BookMySeats = () => {
const getFlightByID = async ()=>{ 
    await axios
    .get("http://localhost:5000/flights/" + FlightID)
    .then((response) => {
        console.log(response.data);
        setEconomySeats(response.data.EconomySeatsAvail);
        setBusinessSeats(response.data.BusinessSeatsAvail);
        setFirstSeats(response.data.FirstSeatsAvail);
    })
    .catch(function (error) {
        console.log(error);
    });
}
const getFlightByNumber = async ()=>{ 
    await axios
    .get("http://localhost:5000/flights/flightByNumber/" + depFlightNumber)
    .then((response) => {
        console.log(response.data);
        
        setEconomySeats(response.data.EconomySeatsAvail);
        setBusinessSeats(response.data.BusinessSeatsAvail);
        setFirstSeats(response.data.FirstSeatsAvail);
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
                const newBooked = [...bookedSeats, ev.target.innerText];
                setBookedSeats(newBooked);
            } else if (bookedSeats.length === seatsToBook) {
                bookedSeats.shift();
                const newBooked = [...bookedSeats, ev.target.innerText];
                setBookedSeats(newBooked);  
            }
        }
      }
    };

    const updateFlightSeats = async ()=>{ 
        const newFirstSeats = firstSeats.map((e, index)=> e && bookedSeats.includes((index+1).toString())? false: true);
        console.log("seats", newFirstSeats);

        const newBusinessSeats = businessSeats.map((e, index)=>{ 
            return e && !(bookedSeats.includes((index+1+firstSeats.length).toString()));
        });

        const newEconomySeats = economySeats.map((e, index)=> e && !(bookedSeats.includes((index+1+firstSeats.length + businessSeats.length).toString())));
        

if(flag==0){
    console.log("New booking");
}else{
    //making old booked seats available again
    var lenFirst= newFirstSeats.length;
    var lenBiz= newBusinessSeats.length;
    var oldseats=sessionStorage.getItem("oldSeats");
   
    for (var i = 0; i < oldseats.length; i++) { 
            if(oldseats[i] -1 <lenFirst ){
                newFirstSeats[oldseats[i] -1] = true;
                //newFirstSeats.splice(oldseats[i] - 1,0,true);
            }
            else if(oldseats[i] - 1< lenFirst+lenBiz){
                newBusinessSeats[oldseats[i] -1] = true;
                //newBusinessSeats.splice(oldseats[i] -1 ,0,true);
            }else{
                newEconomySeats[oldseats[i] -1] = true;
              //  newEconomySeats.splice(oldseats[i] - 1,0,true);
            }
     }

console.log("New economy seats", newEconomySeats);
console.log("new buss seats ", newBusinessSeats);
console.log("New first seats ", newFirstSeats);



}


        // setEconomySeats(newEconomySeats);
        // setBusinessSeats(newBusinessSeats);
        // setFirstSeats(newFirstSeats);

        const seatsMap = {
            EconomySeatsAvail: newEconomySeats,
            BusinessSeatsAvail: newBusinessSeats,
            FirstSeatsAvail: newFirstSeats,
        };

        sessionStorage.setItem("DepBookedSeats", bookedSeats);
        sessionStorage.setItem("DepSeatsMap", JSON.stringify(seatsMap));
    }

  React.useEffect(() => {
      if(flag==0){
        getFlightByID();
      }else{
        getFlightByNumber();
      }
    
  }, []);

  const confirmBooking = async ()=> {
    await updateFlightSeats();
    setBookedStatus('You have successfully booked the following seats:' + bookedSeats.toString());
        if(flag==0){
            //new booking
            console.log("Creating new booking");

      window.location.replace(`http://localhost:3000/flights/users/return?flag=${flag}`)
    }
      else {
          //edit existing
        console.log("Updating Existing booking");

        window.location.replace("http://localhost:3000/flights/users/itinerary")
    }

      
      bookedSeats.forEach(seat => {
           setBookedStatus(prevState => {
               return prevState + seat + ' ';
           })
      });

    //   let newAvailableSeats = economySeats.filter(seat => !bookedSeats.includes(seat));
    //   setEconomySeats(newAvailableSeats);
    //   newAvailableSeats = businessSeats.filter(seat => !bookedSeats.includes(seat));
    //   setBusinessSeats(newAvailableSeats);
    //   newAvailableSeats = firstSeats.filter(seat => !bookedSeats.includes(seat));
    //   setFirstSeats(newAvailableSeats);
    //   setBookedSeats([]);
    //   setNumberOfSeats(0);
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