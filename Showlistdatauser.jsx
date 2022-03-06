import React, {Component} from 'react';
import Showlistuser from './Showlistuser';
import axios from 'axios';
import bg from './bg.jpg'
import { Navigate } from "react-router-dom";
class Showlistuser extends Component {
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
        axios.get("http://localhost:8055/theatre/shows/all")
        .then(response => {
            this.setState({ listshows: response.data})
        });
    }

    render() {

        if(this.state.user.userId===null) {
            alert("Please Login/Register to access full features")
            return <Navigate to="/login"></Navigate>
    }

    return (
        <div>
        <h3 className="text-center text-secondary">Shows</h3>
         {this.state.listshows.map(s => <Showlistuser key={s.showId} s={s} />)}
         </div>
    );
        

    }
}

export default Showlistuser;