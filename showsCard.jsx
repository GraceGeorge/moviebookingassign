import React from "react"
import img2 from "./img2.jpg"
import bg from "./bg.jpg";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link, Navigate, Routes} from "react-route-dom";
class Showscards extends React.Component {
    constructor(props) {
        super(props);
            this.state={
            theatre: "",
            movie: "",
            seats: "",
            showTime: "",
            buttonClicked: false,
            book: false,
            update: false,
            formatted:""
        }
    }
    componentDidMount = () =>{
        var format=new Date(this.props.s.showTime)
        console.log("format"+format)
        var formatted=format.toISOString().slice(0,10)+" "+format.toISOString().slice(11,16)
        this.setState({ formatted:formatted})

    }
     handleLogin = () =>{
       this.setState({book: true})
    }
    update = () => {
        this.setState({update : true})
    }
    delete = () => {
        axios.delete("http://localhost:8055/theatre/shows/delete/"+this.props.s.showId)
        .then(response => {
            alert(response.data)
            window.location.reload(false);
        })
        .catch(error => {
            alert("Show cannot be alerted")
        });

    }
     
    render() {
        if(this.state.update) {
            return <Navigate to={"/shows/update/" + this.props.s.showId}></Navigate>
        }
        return(
            <div className="cards" style={{ width: 500, margin: '0px auto'}}>
                <img className="card-img-bottom" src={img2} height="200" alt="Card image cap" />
                <div className="card-body">
                    <p className="card-text">
                        <span>Show ID : {this.props.s.showId}</span> <br/>
                        <span>Movie : {this.props.s.movie.movieName}</span> <br/>
                        <span>Theatre : {this.props.s.theatre.theatreName}</span> <br/>
                        <span>Show Time: {this.state.formatted}</span> <br/>
                        <span>Seats : {this.props.s.seats}</span> <br/>
                        <span>Rate : {this.props.s.theatre.rate}</span> <br/>

                    </p>
                    <button type="button" onClick={this.update} className="btn btn-secondary">
                        Update
                    </button>
                    <button type="button" onClick={this.delete} className="btn btn-danger">
                        Delete
                    </button>

                </div>
            </div>
        )
        }
    }

    export default Showscards;
