import React from 'react';
import  '../css/Seats.css';

const Seats = (props) => {
    let index = props.offset;

    return (
      <div class="section">
          {props.values.map(seat => {
              const isAvailable = seat;
              index ++;
              const isBooked = props.bookedSeats.includes(index.toString());
              let seatClass;
              if(!isAvailable) {
                  seatClass = "disabled";
              }
              if(isBooked) {
                  seatClass = "booked";
              }
              return <div class={seatClass} onClick={props.addSeat} key={index}>{index}</div>;
          })}
      </div>
    );
}
export default Seats;