import React from 'react';
import  '../css/Seats.css';

const Seats = (props) => {
    console.log('aloo ' + props.values.keys());

    return (
      <div class="section">
          {Array.from(props.values.entries()).map(seat => {
              const isAvailable = !seat.booked;
              const isBooked = props.bookedSeats.includes(seat);
              let seatClass;
              if(!isAvailable) {
                  seatClass = "disabled";
              }
              if(isBooked) {
                  seatClass = "booked";
              }
              return <div class={seatClass} onClick={props.addSeat} key={seat}>{seat}</div>;
          })}
      </div>
    );
}
export default Seats;