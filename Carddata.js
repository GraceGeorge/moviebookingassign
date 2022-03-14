import React, { Component } from 'react';
import '../App.css';
import Card from './Cards';
import axios from 'axios';
import bg from './bg.jpg';
import { Navigate ,Link} from "react-router-dom";
class Carddata extends Component {
    constructor() {
        super();
        this.state = {
            shows : [],
            user: {
                "userId": sessionStorage.getItem("userId"),
                "userName": sessionStorage.getItem("userName"),
            },

        }
    }

    componentDidMount() {
        axios.get("http://localhost:8055/movies/all")
        .then(response => {
            this.setState({ shows: response.data})
        });
    }

    render() {
        if(this.state.user.userId===null) {
            alert("Please Login/Register to access full features")
            return <Navigate to="/login"></Navigate>
        }

        return (
            <div text-align="center">
                <h3 className="text-center text-secondary">Movies</h3>
                <div text-align="center">
                    <Link to="/movie/add" style={{ textDecoration: 'none'}}>
                        <div text-align="center">
                            <button type="button" className="button">
                                Add Movie
                            </button>
                        </div>
                    </Link>
                </div><br></br>
                {this.state.shows.map(s => <Card key={s.movieId} s={s}/>)}
            </div>
        );
    }
}
export default Carddata;