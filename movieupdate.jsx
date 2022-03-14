import axios from "axios";
import React, { Component } from "react";
import { Navigate, useNavigate ,useParams} from "react-router-dom";

class Movieupdate extends React.Component{
    state = {
        movie : [],
        formValue:{
            movieName:'',
            director:'',
            rating:'',
            genre:'',
        },
        fieldValidity: {
            userName: false,
            director: false,
            rating: false,
            genre: false,
        },
         formValid: false,
         successMessage: '',
         update:false
    };
     validateName = (event) => {
         var fieldValidity = this.state.fieldValidity;
         this.setState({ formValue: {...this.state.formValue, movieName: event.target.value}});
         fieldValidity.userName=true;
         console.log(this.state.fieldValidity.userName);
         this.setState({ formValid: fieldValidity.movieName && fieldValidity.director && fieldValidity.rating && fieldValidity.genre})
     }
     validateDirector = (event) => {
        var fieldValidity = this.state.fieldValidity;
        this.setState({ formValue: {...this.state.formValue, director: event.target.value}});
        fieldValidity.director=true;
        //console.log(this.state.fieldValidity.userName);
        this.setState({ formValid: fieldValidity.movieName && fieldValidity.director && fieldValidity.rating && fieldValidity.genre})
    }
    validateRating = (event) => {
        var fieldValidity = this.state.fieldValidity;
        this.setState({ formValue: {...this.state.formValue, rating: event.target.value}});
        fieldValidity.rating=true;
        //console.log(this.state.fieldValidity.userName);
        this.setState({ formValid: fieldValidity.movieName && fieldValidity.director && fieldValidity.rating && fieldValidity.genre})
    }
    validateGenre = (event) => {
        var fieldValidity = this.state.fieldValidity;
        this.setState({ formValue: {...this.state.formValue, genre: event.target.value}});
        fieldValidity.genre=true;
        //console.log(this.state.fieldValidity.userName);
        this.setState({ fieldValidity: fieldValidity })
    this.setState({ formValid: fieldValidity.movieName && fieldValidity.director && fieldValidity.rating && fieldValidity.genre})
    console.log(this.state.formValid);
    console.log(this.state.fieldValidity);
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.register()
    }
    
    componentDidMount() {
        axios.get("http://localhost:8055/movies/" + this.props.movieId)
        .then(response => {
            this.setState({ movie: response.data})
            console.log("did mount")
            this.setState({ formValue: {...this.state.formValue, movieName: this.state.movie.movieName}});
            this.setState({ formValue: {...this.state.formValue, director:this.state.movie.director}});
            this.setState({ formValue: {...this.state.formValue, rating: this.state.movie.rating}});
            this.setState({ formValue: {...this.state.formValue, genre:this.state.movie.genre}});

        });
    }
    register = () => {
        const movie = {
            movieId : this.props.movieId,
            movieName: this.state.formValue.movieName,
            director: this.state.formValue.rating,
            rating: this.state.formValue.genre
            
        };

        axios
          .post("http://localhost:8055/movies/update" +this.props.movieId, movie)
          .then(response => {
              this.setState({ successMessage: response.data.message, error: ""});
              console.log(response.data);
              alert("Movie updated successfully")
              this.setState({update:true})
          })
          .catch(error => {
              if(error.response) {
                  this.setState({ error: error.response.data.message, success: ""});
                } else {
                    this.setState({ error: error.message, success: ""});
                }
          });
    };

    render() {
        if(this.state.update) {
            return <Navigate to="/movies"></Navigate>
        }
        return (
            <div style={{ width:500, margin: '0px auto'}}>
                <form>
                    <h3 className="text-center">Update Movie</h3>
                    <div className="form-group">
                        <label>Movie Id</label>
                        <input className="form-control" value = {this.state.movie.movieId} disabled/>
                    </div><br></br>
                    <div className="form-group">
                        <label>Movie Name</label>
                        <input className="form-control" onChange={this.validateName} placeholder={this.state.movie.movieName} />
                    </div><br></br>
                    <div className="form-group">
                        <label>Director</label>
                        <input className="form-control" onChange={this.validateDirector} placeholder={this.state.movie.director} />
                    </div><br></br>
                    <div className="form-group">
                        <label>Rating</label>
                        <input className="form-control" onChange={this.validateRating} placeholder={this.state.movie.rating} />
                    </div><br></br>
                    <div className="form-group">
                        <label>Genre</label>
                        <input className="form-control" onChange={this.validateGenre} placeholder={this.state.movie.genre} />
                    </div><br></br>

                    
                </form>
            </div>
        );
    }

}
export default Movieupdate;