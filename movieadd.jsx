import axios from "axios";
import React, { Component } from "react";
import { Navigate, useNavigate, useParams} from "react-router-dom";

class Movieadd extends React.Component {
    state = {
        formValue:{
            movieName: '',
            director: '',
            rating: '',
            genre: '',
        },
        fieldValidity: {
            userName: false,
            director: false,
            rating: false,
            genre: false,
        },

        formValid: false,
        successMessage: '',
        added:false
    };
    validateName = (event) => {
        var fieldValidity = this.state.fieldValidity;
        this.setState({ formValue: {...this.state.formValue, movieName: event.target.value}});
        fieldValidity.userName=true;
        this.setState({ fieldValidity: {...this.state.fieldValidity, movieName: true}});
        this.setState({ formValid: fieldValidity.movieName && fieldValidity.director && fieldValidity.rating && fieldValidity.genre});
    }
    validateName = (event) => {
        var fieldValidity = this.state.fieldValidity;
        this.setState({ formValue: {...this.state.formValue, director: event.target.value}});
        fieldValidity.userName=true;
        this.setState({ fieldValidity: {...this.state.fieldValidity, director: true}});
        this.setState({ formValid: fieldValidity.movieName && fieldValidity.director && fieldValidity.rating && fieldValidity.genre});
    }
    validateName = (event) => {
        var fieldValidity = this.state.fieldValidity;
        this.setState({ formValue: {...this.state.formValue, rating: event.target.value}});
        fieldValidity.rating=true;
        this.setState({ fieldValidity: {...this.state.fieldValidity, rating: true}});
        this.setState({ formValid: fieldValidity.movieName && fieldValidity.director && fieldValidity.rating && fieldValidity.genre});
    }
    validateName = (event) => {
        var fieldValidity = this.state.fieldValidity;
        this.setState({ formValue: {...this.state.formValue, genre: event.target.value}});
        fieldValidity.genre=true;
        this.setState({ fieldValidity: {...this.state.fieldValidity, genre: true}});
        this.setState({ formValid: fieldValidity.movieName && fieldValidity.director && fieldValidity.rating && fieldValidity.genre});
    console.log(this.state.formValid);
    console.log(this.state.fieldValidity);
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.register()
    }
    register = () => {
        const movie = {
            movieName: this.state.formValue.movieName,
            director: this.state.formValue.director,
            rating: this.state.formValue.rating,
            genre: this.state.formValue.genre

        };

        axios
          .post("http://localhost:8055/movies/add", movie)
          .then(response => {
              this.setState({ successMessage: response.data.message, error: ""});
              console.log(response.data);
              alert(response.data)
              this.setState({added:true})
          })

          .catch(error => {
              if (error.response) {
                  this.setState({ error: error.response.data.message, success: ""});
                  alert("Enter correct details")
              } else {
                  this.setState({ error: error.message, success: ""});
                  alert("Enter correct details")
              }

          });
          
    };

    render() {
        if(this.state.added){
            return <Navigate to="/movies" />
        }
        return (
            <div style={{ width: 500, margin: '0px auto'}}>
                <form>
                    <h3 className="text-center">New Movie</h3>
                        <div className="form-group">
                            <label>Movie Name</label>
                            <input className="form-control" onChange={this.validateName} value={this.state.formValue.movieName}></input>
                        </div><br></br>
                        <div className="form-group">
                            <label>Director</label>
                            <input className="form-control" onChange={this.validateDirector} value={this.state.formValue.director}></input>
                        </div><br></br>
                        <div className="form-group">
                            <label>Rating</label>
                            <input className="form-control" onChange={this.validateRating} value={this.state.formValue.rating}></input>
                        </div><br></br>
                        <div className="form-group">
                            <label>Genre</label>
                            <input className="form-control" onChange={this.validateGenre} value={this.state.formValue.genre}></input>
                        </div><br></br>
                        <button type="button" onClick={this.handleSubmit} className="btn btn-success" disabled={!this.state.formValid}>
                            AddMovie </button><br />
                </form>
            </div>
        );
    }

}
export default Movieadd;