import React, { Component } from 'react';
import Showscard from './showsCard';
import axios from 'axios';
import bg from './bg.jpg';
import {Navigate} from "react-router-dom";
import MyBookingcard from './Mybookingcard';

class Bookingdata extends Component {
    constructor() {
        super();
        this.state = {
            listbooking : [],
            user: {
                "userId": sessionStorage.getItem("userId"),
                "userName": sessionStorage.getItem(userName),
            },
            msg:""
        }
    }

componentDidMount() {
    console.log(this.state.user.userId);
    axios.get("http:/localhost:8055/booking/mybooking"+this.state.user.userId)
    .then(response => {
        this.setState({ listbooking: response.data})
        console.log("didmount ok");
        console.log(this.state.listbooking.length);
        if(this.state.listbooking.length===0) {
            this.setState({ msg:"You have no current bookings"})

        }
    });
}

  render() {
      if(this.state.user.userId===null) {
          alert("Please Login/Register to access the features")
          return <Navigate to="/login"></Navigate>
      }

      return (
          <div>
              <h3 className="text-center text-secondary">My Booking</h3>
              <h3 className="text-center text-danger">{this.state.msg}</h3>
              {this.state.listbooking.map(s => <MyBookingcard key={s.bookingId} s={s}/>)}
          </div>
      );
  }
}

export default Bookingdata;