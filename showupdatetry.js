import axios from "axios";
import React, { Component} from "react";
import { Navigate } from "react-router-dom";

class Showupdate extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            show:[],
            m : [],
            t : [],
            movie:{
                movieId:''
            },
            theatre:{
                theatreId:''
            },
            date:'',
            select :"--Select--",
            movieId :"",
            theatreId :"",
            update:false
        }
    }
componentDidMount() {
    axios.get("http://localhost:8055/theatre/shows/" + this.props.showId)
    .then(response => {
        this.setState({ show: response.data})
        console.log("did mount show");
    });
    axios.get("http://localhost:8055/movies/all")
     .then(response =>
        {
            this.setState({ m : response.data})
            console.log("did mount theatre")
        });
}
handleMovie = (event) => {
    var value = event.target.value;
    this.setState({ movie: {...this.state.movie, movieId: event.target.value}});
    this.setState({ movieId : value})
    console.log("hi handlemovie")
    console.log(this.state.movieId);
}
 handleTheatre = (event) => {
     var value=event.target.value;
     this.setState({ theatre: {...this.state.theatre, theatreId: event.target.value}});
     this.setState({ theatreId : value})
     console.log(" hi handletheatre")
     console.log(this.state.theatreId)
 }
 handleDate = (event) => {
     var value=event.target.value;
       this.setState({date:event.target.value})
       console.log(value);
 }

 handleSubmit = (event) => {
     event.preventDefault()
     this.register()
 }
 register = () => {
     const show5 = {
         showId:this.props.showId,
         movie:this.state.movie,
         theatre: this.state.theatre,
         showTime: this.state.date
     };
     console.log(show5);
     if(!show5.showTime) {
         alert("Enter all values")
     } else {
         axios
         .post("http://localhost:8055/theatre/shows/update/" +this.props.showId, show5)
         .then(response => {
             this.setState({ successMessage: response.data.message, error:""});
             alert("Update successfull")
             this.setState({ updated:true})
         })
         .catch(error => {
             if(error.response) {
                 alert("Enter all values")
                 this.setState({error: error.response.data.message, success: ""});
             } else {
                 this.setState({ error: error.message, success: ""});
             }
         });
     }
 };
  
 render() {
     if(this.state.updated) {
         return <Navigate to="/shows" />
     }

     return(
         <div style={{ width: 250, margin:'0px auto'}}>
             <form>
                 <h3 className="text-center">Update Show</h3>
                 <div className="form-group" style={{width:125, margin: '0px auto'}}>
                     <label>Show Id</label>
                     <input className="form-control" value={this.props.showId} disabled/>

                 </div>
                 <div className="form-group">
                     <label>Movie ID {" "}:</label> <br></br>
                     <select value={this.state.movieId} onChange={this.handleMovie}><option className="form-control">{this.state.select}</option>
                             {this.state.m.map((mm) => <option key={mm.movieId}> value={mm.movieId} </option>)}
                     </select>
                 </div>
                 <br></br>
                 <div className="form-group">
                     <label>
                         Theatre ID
                     </label> <br/>
                     <select value={this.state.theatreId} onChange={this.handleTheatre}><option className="form-control">{this.state.select}</option>
                             {this.state.t.map((m) => <option key={m.theatreId}> value={m.theatreId} </option>)}
                     </select> 
                 
                 </div>
                 <br></br>
                 <div>
                     <label> Select Date</label><br/>
                     <input type="datetime-local" min="2022-02-16T04:30:00" onChange={this.handleDate}></input><br/>
                    </div><br></br>
                    <button type="datetime-local" onClick={this.handleSubmit} className="btn btn-success"> Update </button><br/>

             </form>

         </div>
     )
 }
} 
export default Showupdate;