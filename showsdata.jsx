import React from "react"
import axios from "axios";

class Showsdata extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shows: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8083/booking/bookingReport 2022-01-04/2022-01-06" )
        .then(response => {
            this.setState({ movies: response.data})
        })
    }
}