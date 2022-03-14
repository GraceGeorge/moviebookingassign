import React, { Component } from "react";
import { Navigte } from "react-router-dom";
import Home from "./Home";
import Login from "./Logintry1"
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, Routes } from "react-router-dom";
import Register from "./Registerr.js";
import Carddata from "./Carddata.js";
import Booking from "./BookingReport";
import Movieadd from "./movieadd";
import Movieupdate from "./movieupdate";
import GetId from "./Getid";
import Showscarddata from "./ShowsCarddata";
import Showadd from "./showadd";
import Showlistdatauser from "./Showlistdatauser";
import BookingReport from "./BookingReport";
import MyBookingCard from "./Mybookingcard";
import Theatrecarddata from "./viewmoviedata";
import Theatreadd from "./theatreadd";
import GetTid from "./GetTid";
import GetSid from "./GetSid";
import Bookingdata from "./MyBookingData";
import ViewMovieData from "./viewmoviedata";
import ViewTheatreData from "./viewtheatredata";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged_userId: sessionStorage.getItem("userId"),
            logged_userName: sessionStorage.getItem("userName"),
            dialog_visible: false,
            logged_out: false,
            admin: sessionStorage.getItem("role")
            
        };
    }

    onClick = () => {
        this.setState({ dialog_visible: true});

    };

    onHide = () => {
        this.setState({ dialog_visible: false});
    }

    logout = () => {
        this.setState({ dialog_visible: false});
        sessionStorage.clear();
        this.setState({logged_out: true});
        window.location.reload();
    };

    confirm_logout = () => {
        this.setState({ dialog_visible: true});
    };

    render() {
        if(this.state.logged_out){
            return <Navigte to="/login"/>

        }

        return (
            <div>
                <Router>
                    <div className="App">
                        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                            <div className="navbar-header">
                                <Link className="navbar-brand" to="/">
                                    Movie Hub
                                </Link>
                            </div>
                            <ul className="navbar-nav">
                                {this.state.logged_userId ? (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="">
                                            Welcome {this.state.logged_userName}
                                        </Link>
                                    </li>
                                ) : null}
                                <ul className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/shows_nearby">
                                            Shows Nearby{" "}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        {this.state.logged_userId ? (
                                            null
                                        ) : <Link className="nav-link" to="/register">
                                            Register
                                        </Link>
                                    }
                                    </li>
                                    <li className="nav-item">
                                        {this.state.logged_userId ? (
                                            <Link className="nav-link" to="/bookings">
                                                My Booking{" "}
                                            </Link>
                                        ) : null}
                                    </li>
                                    <li className="nav-item">
                                        {this.state.admin==="user" ? (
                                            <Link className="nav-link" to="/viewMovies">
                                                View Movies{" "}
                                            </Link>
                                        ) : null}
                                    </li>
                                    < li className="nav-item">
                                        {this.state.admin==="user" ? (
                                            <Link className="nav-link" to="/viewTheatre">
                                                View Theatre{" "}
                                            </Link>
                                        ) : null}
                                    </li>

                                    {this.state.admin=== "admin" ? (
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/movies">
                                                Movies
                                            </Link>
                                        </li>
                                    ) : null}
                                    {this.state.admin==="admin" ? (
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/theatre">
                                                Theatre
                                            </Link>
                                        </li>
                                    ): null}
                                    {this.state.admin=== "admin" ? (
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/bookingReport">
                                                BookingReport
                                            </Link>
                                        </li>
                                    ) : null}
                                    {!this.state.logged_userId ? (
                                        <li className="nav-item">
                                            <NavLink className="nav-link" onClick={this.logout} to="">
                                                {" "}
                                                Logout
                                            </NavLink>
                                        </li>
                                    ) : null}
                                </ul>
                            </ul>
                        </nav>

                        <Routes>
                            <Route exact path="/" element={<Home/>}/>
                            <Route exact path="/register" element={<Register/>}/>
                            <Route exact path="/login" element={<Login/>}/>
                            <Route exact path="/movies" element={<Carddata/>}/>
                            <Route exact path="/shows" element={<Showscarddata/>}/>
                            <Route exact path="/show/add" element={<Showadd/>}/>
                            <Route exact path="/booking" element={<Booking/>}/>
                            <Route exact path="/movie/add" element={<Movieadd/>}/>
                            <Route exact path="/movie/update/:movieId" element={<GetId/>}/>
                            <Route exact path="/shows_nearby" element={<Showlistdatauser/>}/>
                            <Route exact path="/bookingReport" element={<BookingReport/>}/>
                            <Route exact path="/bookings" element={<Bookingdata/>}/>
                            <Route exact path="/theatre" element={<Theatrecarddata/>}/>
                            <Route exact path="/theatre/add" element={<Theatreadd/>}/>
                            <Route exact path="/theatre/update/:theatreId" element={<GetTid/>}/>
                            <Route exact path="/shows/update/:showId" element={<GetSid/>}/>
                            <Route exact path="/viewMovies" element={<ViewMovieData/>}/>
                            <Route exact path="/viewTheatre" element={<ViewTheatreData/>}/>

                            

                        </Routes>






                    </div>
                </Router>
            </div>
        );
    }
}
export default NavBar;
    