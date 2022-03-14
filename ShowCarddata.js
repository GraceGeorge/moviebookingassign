import React, { Component } from 'react';
import '../App.css';
import Showscard from './showsCard';
import axios from 'axios';
import bg from './bg.jpg';
import { Navigate, Link} from "react-router-dom";
class Showscarddata extends Component {
    constructor() {
        super();
        this.state = {
            listshows : [],
            user: {
                "userId": sessionStorage.getItem("userId"),
                "userName": sessionStorage.getItem("userName"),
            },
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8055/shows/all")
        .then(response => {
            this.setState({ listshows: response.data})
        });
    }
     
    render() {
        if(this.state.user.userId===null){
            alert("Please Login/Register to access full features")
            return <Navigate to="/login"></Navigate>
        }

        return (
            <div>
                <h3 className="text-center text-secondary">Shows</h3>
                <Link to="/show/add" style={{ textDecoration: 'none'}}>
                    <div text-align="center">
                        <button type="button" className="button"> Add show</button>
                    </div>
                </Link><br></br>
                {this.state.listshows.map(s => <Showscard key={s.showId} s={s}/>)}
            </div>
        );
    }
}

export default Showscarddata;