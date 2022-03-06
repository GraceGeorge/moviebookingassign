import React, { Component } from 'react';
import ViewTheatrecard from './viewtheatrecard';
import axios from 'axios';
import bg from './bg.jpg';
import { Navigate } from "react-router-dom";

class ViewTheatreData extends Component {
    constructor() {
        super();
        this.state = {
            listtheatre : [],
            user: {
                "userId": sessionStorage.getItem("userId"),
                "userName": sessionStorage.getItem("userName"),

            },
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8055/theatre/theatre/all")
        .then(response => {
            this.setState({ listtheatre: response.data})
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
                {this.state.listtheatre.map(s => <ViewTheatrecard key={s.theatreId} s={s}/>)}
            </div>
        );
    }
}
 
export default ViewTheatreData;