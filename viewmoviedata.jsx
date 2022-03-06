import React, {Component} from 'react';
import ViewMovieCard from ',/viewmovie';
import axios from 'axios';
import bg from './bg.jpg';
import { Navigate ,Link} from "react-router-dom";
class ViewMoviedata extends Component {
    constructor() {
        super();
        this.state = {
            shows : [],
            user: {
                "userId": sessionStorage.getItem("userId"),
                "userName": sessionStorage.getItem("userName"),
            },
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8055/movies/all")
        .then(response => {
            this.setState({shows: response.data})
        });
    }

     render() {
         if(this.state.user.userId===null) {
             alert("Please Login/Register to access full features")
             return <Navigate to="/login"></Navigate>
         }
          return (
              <div text-align="center">
                  <h3 className="text-center text-secondary">Movies</h3>

                  {this.state.shows.map(s => <ViewMovieCard key={s.movieId} s={s}/>)}
              </div>
          );
     }
}

export default ViewMoviedata;