import React from "react"
import img2 from "./img2.jpg"
import bg from "./bg.jpg"
import axios from 'axios';

import { BrowserRouter as Router, Route, Switch, Link, Navigate, Routes} from "react-router-dom";
import Register from "./Register";
import Book from "./Book";

class Showlistuser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            theatre : "",
            movie : "",
            seats : "",
            showTime : "",
            buttonClicked : false,
            book : false,
            update : false,
            refresh : false,
            zero : false,
            timeFormatted: ""
        }
    }

    componentDidMount = () =>{
        var format=new Date(this.props.s.showTime)
        console.log("format"+format)
        var formatted=format.toISOString().slice(0,10)+" "+format.toISOString().slice(11,16)
        console.log("formated"+formatted)
        this.setState({ timeFormatted:formatted})
        console.log("date"+this.state.timeFormatted)
        console.log("seats"+this.props.s.seats)
        if(this.props.s.seats === 0) {
            this.setState({ zero:true })
        }

    }
    handleLogin = () => {
        this.setState({book:true})
    }
    update = () => {
        this.setState({update: true})
    }
    book = () => {
        this.setState({book: true})
    }

    render() {
        if(this.state.refresh === false) {
            this.setState({refresh:true})
            console.log(this.state.refresh)
        }
        return(
            <div className="cards" style={{ width: 500, margin: '0px auto'}}>
                <img className="card-img-bottom" src={img2} height="200" alt="Card image cap" />
                <div className="card-body">
                    <p className="card-text">
                        <span>Movie : {this.props.s.movie.movieName}</span> <br/>
                        <span>Theatre :{this.props.s.theatre.theatreName}</span> <br/>
                        <span>Show time: {this.state.timeFormatted}</span>
                        <span>Seats :{this.props.s.seats}</span> <br/>
                        <span>Rate: {this.props.s.theatre.rate}</span> <br />
                    </p>

                    <button type="button" className="btn btn-success" onClick={this.book} disabled={this.state.zero}>
                       Book
                    </button>
                    {this.state.book ? (<Book showsdetails={this.props.s} showId={this.props.s.showId} showTime={this.props.s.showTime}
                                        seats={this.props.s.seats} theatreId={this.props.s.theatre.theatreId}
                                        movieId={this.props.s.movie.movieId}movieName={this.props.s.movie.movieName}
                                        theatreName={this.props.s.theatre.theatreName}></Book>):null}
                
                </div>
            </div>
        )

    }
} 