import React, { Component } from 'react';
import '../App.css';
import Theatrecard from './theatrecard';
import axios from 'axios';
import bg from './bg.jpg';
import { Navigate, Link } from "react-router-dom";

class Theatrecard extends Component {
    constructor() {
        super();
        this.state = {
            listtheatre : [],
            user : {
                "userId":sessionStorage.getItem("userId"),
                "userName":sessionStorage.getItem("userName"),
            },
        }
    }

ComponentDidMount() {
    axios.get("http://localhost:8055/theatre/theatre/all")
    .then(response => {
        this.setState({ listtheatre: response.data })
    });
}
    render() {
        if(this.state.user.userId===null) {
            alert("Please Login/Register to access full features")
            return <Navigate to="/login"></Navigate>
        }

        return (
            <div>
                <h3 className="text-center text-secondary">Theatre</h3>
                <Link to="theatre/add" style={{ textDecoration: 'none'}}>
                    <div>
                        <button type="button" className="button">
                            Add Theatre
                        </button>
                    </div>
                </Link> <br></br>

                {this.state.listtheatre.map(s => <Theatrecard key={s.theatreId} s={s}/>)}
            </div>
        );
    }


}