import axios from "axios"
import React, { Component} from "react";
import { Navigate } from "react-router-dom";

class Showadd extends React.Component{
    state = {
        formValue:{
            movieId: '',
            theatreId: '',
            showTime: '',
        },
        showTime:'',
        m : [],
        t : [],
        movie: {
            movieId
        },
        theatre:{
            theatreId: ''
        },
        date:'',
        fieldValidity: {
            movieName: false,
            theatreName: false,
            showTime: false,
        },

        formValid: true,
        successMessage: '',
        next: false,
        added: false,
        select: "--Select--",
    };
    componentDidMount() {
        axios.get("http://localhost:8085/movies/all")
             .then(response =>
                {
                    this.setState({ m : response.data})
                    console.log("did mount movie")
                }
                );
        
        axios.get("http://localhost:8055/theatre/theatre/all")
            .then(response => {
                this.setState({ t: response.data})
                console.log("did mount theatre");
            });
    }
    handleMovie = (event) =>{
        var value=event.target.value;
        this.setState({ movie: { ... this.state.movie, movieId: event.target.value}});
        this.setState({ movieId : value})
        console.log(" hi handlemovie")
        console.log(this.state.movieId);
    }
    handleTheatre = (event) =>{
        var value=event.target.value;
        this.setState({ theatre: {...this.state.theatre, theatreId: event.target.value}});
        this.setState({ theatreId : value })
        console.log("hi handletheatre")
        console.log(this.state.theatreId);
    }
    handleDate = (event) => {
        var value=event.target.value;
        this.setState({date: event.target.value});
        console.log(value)
        
    }
    validateMovieName = (event) =>
    {
        var fieldValidity = this.state.fieldValidity;
        this.setState({ formValue: { ... this.state.formValue, movieName: event.target.value}});
        this.setState({ movie :{... this.state.formValue, movieId: event.target.value }});
        fieldValidity.movieName= true;

        this.setState({ fieldValidity: { ... this.state.fieldValidity, movieName: true}});
        this.setState({ formValid: fieldValidity.movieName && fieldValidity.theatreName && fieldValidity.showTime && fieldValidity.seat && fieldValidity.rate });
        
    }
    validateTheatreName = (event) =>
    {
        var fieldValidity = this.state.fieldValidity;
        this.setState({ formValue: { ... this.state.formValue, theatreName: event.target.value}});
       
        fieldValidity.theatreName= true;

        this.setState({ fieldValidity: { ... this.state.fieldValidity, theatreName: true}});
        this.setState({ theatre :{... this.state.formValue, theatreId: event.target.value }});
        this.setState({ formValid: fieldValidity.movieName && fieldValidity.theatreName && fieldValidity.showTime && fieldValidity.seat && fieldValidity.rate});

    }
    validateSeat = (event) =>
    {
        var fieldValidity = this.state.fieldValidity;
        this.setState({ formValue: { ... this.state.formValue, seat: event.target.value}});
       
        fieldValidity.seat= true;

        this.setState({ fieldValidity: { ... this.state.fieldValidity, seat: true}});
        this.setState({ formValid: fieldValidity.movieName && fieldValidity.theatreName && fieldValidity.showTime && fieldValidity.seat && fieldValidity.rate});

    }
     
    validateRate = (event) => 
    {
        var fieldValidity = this.state.fieldValidity;
        this.setState({ formValue: { ... this.state.formValue, rate: event.target.value}});
       
        fieldValidity.rate= true;

        this.setState({ fieldValidity: { ... this.state.fieldValidity, rate: true}});
        this.setState({ formValid: fieldValidity.movieName && fieldValidity.theatreName && fieldValidity.showTime && fieldValidity.seat && fieldValidity.rate});

        
    }
        
        handleSubmit = (event) =>
        {
            event.preventDefault()
            this.register()
        }

        register = () => {

            const show1 = {
                movie : this.state.movie,
                theatre : this.state.theatre,
                showTime : this.state.date
            };

            if(!show1.showTime) {
                alert("Enter all fields")
            } else {
                console.log("not null")
                console.log(show1.showTime)
            }

            axios
              .post("http://localhost:8085/theatre/shows/add", show1)
              .then(response => {
                  this.setState({ successMessage: response.data.message, error: ""});
                  console.log("data is"+ response.data);

                  this.setState({ added:true});
                  console.log("added"+this.state.added)
                  console.log("next value"+this.state.next)
                  alert(response.data)
                
                })
                .catch(error => {
                    if(error.response) {
                        alert("Enter all fields")
                        this.setState({ error: error.response.data.message, success: ""});
                    } else {
                         
                        this.setState({ error: error.message, success: ""});
                    }
                });
                this.setState({ next:true});
                this.setState({ added:true});

        }
        };

    render() {
        console.log("inside render")
        if(this.state.added){ 
            console.log("inside navigate")
            return <Navigate to="/shows"></Navigate>
        }
        return (
            <div style={{ width: 500, margin: '0px auto'}}>
                <form>
                    <h3 className="text-center">New Show</h3>
                    <div className="form-group">
                        <label> Movie ID {" "}:</label><br></br>
                        <select value={this.state.movieId} onChange={this.handleMovie}><option className="form-control">{this.state.select}</option>
                                 {this.state.m.map((mm) => <option key={mm.movieId} value={mm.movieId}>{mm.movieName}</option>)}
                                 </select>
                    </div>
                    <br></br>
                    <div className="form-group">
                    <label> Theatre ID {" "}:</label><br></br>
                        <select value={this.state.theatreId} onChange={this.handleMovie}><option className="form-control">{this.state.select}</option>
                                 {this.state.m.map((m) => <option key={m.theatreId} value={m.theatreId}>{mm.theatreName}</option>)}
                                 </select>
                        
                    </div>
                    <br></br>
                   <div>
                        <label> Show Time : </label><br/>
                        <input type="determine-local" min="2022-02-16T04:30:00" onChange={this.handleDate}></input><br/>
                        </div>
                        <br></br>
                        <button  type="button" onClick={this.handleSubmit} className="btn btn-success" >
                            Add Show</button>
                        <span className="text-success">{this.state.successMessage}</span>                
                            
                    </form>
                    </div>
        );
    }
    export default Showadd;
 
            