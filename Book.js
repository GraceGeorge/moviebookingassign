import axios from "axios";
import React, { Component } from "react";
class Book extends React.Component {
    state = {
        show : [],
        formValue : {
            seats : '',
        },

        fieldValidity: {
            userName: false,
            password: false,
        },
        formErrors: {
            seatErr : "",
        },
        formValid: false,
        successMessage: '',
        zero:false
    };

    componentDidMount() {
        axios.get("http://localhost:8055/theatre/shows/"+this.props.showId)
        .then(response => {
            this.setState({ show: response.data})
            console.log("ok confirm book");
        });
    }
        validateSeats = (e) => {
          const seats = e.target.value;
          this.setState({ formValue: {...this.state.formValue, seats:e.target.value}});
          var formErrors = this.state.formErrors;
          var fieldValidity = this.state.fieldValidity;
          var errorMessage = "";

          if(seats) {
            var regexNum = new RegExp(/^[0-9]/);
          

          if(regexNum.test(seats)) {
            errorMessage = "";
          }
          else {
            errorMessage = errorMessage + "Please enter a number";
          }
        }


    if(errorMessage !== ""){
        formErrors.seatErr = errorMessage
        this.setState({ formValid : false});
    }
    else {
        formErrors.seatErr = ""
        this.setState({ formErrorMessage : formErrors});
        this.setState({ formValid: true});
    }
    }

    
handleBooking = (event) => {
    event.preventDefault()
    this.book()
}
book = () => {
    var booking={
        bookingId:80,
        user:{userId : sessionStorage.getItem("userId")},
        date : this.props.showTime,
        seatsBooked : this.state.formValue.seats,
        status : "booked",
        show: {
            showId : this.props.showId,
            theatre : {theatreId : this.props.theatreId},
            movie : {movieId : this.props.movieId}
        }

    }

      axios
        .post("http://localhost:8055/booking/add", booking)
        .then(response => {
            console.log(response);
            this.setState({ successMessage : response.data, error: ""});
            if(this.state.successMessage.length<17){
            alert("Booking sucessful")
            window.location.reload(false);
        }
            console.log(this.state.successMessage);
        })
        .catch(error => {
            if(error.response) {
                this.setState({ error: error.response.data.message, success: ""});
            } else {
                this.setState({ error: error.message, success: ""});
            }
        });
    };
    render() {
        return(
            <div style={{ width: 500, margin: '0px auto'}}>
                <form>
                    <h3 className="text-center">Book Now</h3>
                    <div className="form-group">
                        <label>No of seats:</label>
                        <input className="form-control" onChange={this.validateSeats} value={this.state.formValue.seats} />
                    </div>
                    <span className="text-danger">{this.state.formErrors.seatErr}</span>

                    <button type="button" onClick={this.handleBooking} className="btn btn-success" disabled={!this.state.formValid}>
                        Confirm Booking
                    </button><br />
                    <span className="text-danger">{this.state.successMessage}</span>
                    </form>
                    <span name="errorMessage" className="text-secondary">{this.state.error.message}</span>
                
            </div>
        );
    }
}



export default Book;