import React from "react"
import img2 from "./img2.jpg"
import bg from "./bg.jpg";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link, Navigate, Routes} from "react-router-dom";
class ViewMovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            director : "",
            genre : " ",
            movieName : "",
            rating : "",
            buttonClicked: false,
            book: false,
            update : false
        }
    }
    handleLogin = () => {
        this.setState({book: true})
    }
    update = () => {
        this.setState({update : true})
    }
    delete = () => {
        axios.delete("http://localhost:8055/movies/delete/"+this.props.s.movieId)
     .then(response => {
         alert(response.data)
         window.location.reload(false);
     });
    }

    render() {

        return (
            <div className="cards" style={{ width: 500, margin: '0px auto'}}>

                <img className="card-img-button" src={img2} height="200" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title text-center">{this.props.s.movieName}</h5>
                    <p className="card-text">
                        <span>Director : {this.props.s.director}</span> <br/>
                        <span>Genre : {this.props.s.genre}</span> <br/>
                        <span>Rating : {this.props.s.rating}</span> <br/>
                    </p>
                </div>
            </div>
        )
    }
}
export default ViewMovieCard;