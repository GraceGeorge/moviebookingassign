import React from "react"
import img2 from "./img2.jpg"
import bg from ".bg.jpg";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch, Link, Navigate, Routes} from "react-router-dom";
class ViewTheatrecard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            theatre : "",
            movie : " ",
            seats : "",
            showTime : "",
            buttonClicked: false,
            book: false,
            update: false
        }
    }
    handleLogin = () => {
        this.setState({book: true})
    }
    update = () => {
        this.setState({update: true})
    }
    delete = () => {
        axios.delete("http://localhost:8055/theatre/delete/"+this.props.s.theatreId)
      .then(response => {
          alert(response.data)
          window.location.reload(false);
      });
    }

    render() {
        if(this.state.update){
            return <Navigate to={"theatre/update"+ this.props.theatreId}></Navigate>
        }
        return (

            <div className="cards" style={{ width: 500, margin: '0px auto'}}>
                <img className="card-img-button" src={img2} height="200" alt="Card image cap" />
                <div className="card-body">
                    <p className="card-text">
                        <span> Theatre ID : {this.props.s.theatreId}</span><br/>
                        <span> Theatre Name : {this.props.s.theatreName}</span><br/>
                        <span> Location : {this.props.s.theatreLoc}</span><br/>
                        <span> Capacity : {this.props.s.capacity}</span><br/>
                        <span> Rate : {this.props.s.rate}</span><br/>

                    </p>
                </div>
            </div>
            
        )
    }
}
export default ViewTheatrecard;