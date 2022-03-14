import React from "react"
import axios from "axios";
import { render } from "@testing-library/react";

class BookingReport1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            name:'',
            startDate:"",
            startDateEr:false,
            endDateEr:false,
            formatted:""
        };
    }

    componentDidMount() {
        console.log(this.props.startDate)
        axios.get("http://localhost:8083/booking/bookingReport"+this.props.startDate+"/"+this.props.endDate)
        .then(response => {
            this.setState({ movies: response.data})
        });
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Booking Id</td>
                            <td>User Name</td>
                            <td>Shows Id</td>
                            <td>Movie Name</td>
                            <td>Theatre Name</td>
                            <td>Date</td>
                            <td>Seats Booked</td>
                            <td>Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(
                            bookings =>
                            <tr key = {bookings.bookingId}>
                                <td>{bookings.bookingId}</td>
                                <td>{bookings.user.userName}</td>
                                <td>{bookings.show.showId}</td>
                                <td>{bookings.show.movie.movieName}</td>
                                <td>{bookings.show.theatre.theatreName}</td>
                                <td>{bookings.date}</td>
                                <td>{bookings.seatsBooked}</td>
                                <td>{bookings.totalAmount}</td>
                            </tr>

                        )}
                    </tbody>
                </table>
            </div>
        )
}
}
export default BookingReport1