import React from "react"
import img2 from "./img2.jpg"
import bg from "./bg.jpg";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link, Navigate, Routes} from "react-router-dom";
class MyBookingcard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingId : "",
            date : " ",
            seats : "",
            amount : "",
            movie : "",
            theatre : "",
            buttonClicked: false,
            book: false,
            update: false,
            formatted:""
        }
    }
    componentDidMount = () => {
        var format=new Data(this.props.s.date)
        console.log("format"+format)
        var formatted=format.toISOString().slice(0,10)+" "+format.toISOString().slice(11,16)
        this.setState({ formatted:formatted})
    }
    handleLogin = () => {
        this.setState({book: true})
    }
    update = () => {
        this.setState({update : true})
    }
    delete = () => {
        axios.delete("http://localhost:8055/booking/deleteBooking/"+this.props.s.bookingId)
        .then(response => {
            alert(response.data)
            window.location.reload(false);
        });
    }

    render() {

        return (
            <div className="cards" style={{ width: 500, margin: '0px auto'}}>
                
                <img className="card-img-bottom" src={img2} height="200" alt="Card image cap" />
                <div className="card-body">
                    <p className="card-text">
                        <span>Booking ID: {this.props.s.bookingId}</span> <br />
                        <span>Movie : {this.props.s.show.movie.movieName}</span> <br />
                        <span>Theatre: {this.props.s.show.theatre.theatreName}</span> <br />
                        <span>Date : {this.state.formatted}</span> <br />
                        <span>Seats Reserved: {this.props.s.seatsBooked}</span> <br />
                        <span>Amount : {this.props.s.totalAmount}</span> <br />


                    </p>
                </div>

                </div>
        )
    }
}
export default MyBookingcard;