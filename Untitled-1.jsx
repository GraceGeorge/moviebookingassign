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
        this.setState({ theatre: {...this.state.movie, movieId: event.target.value}});
        this.setState({ movieId : value })
        console.log("hi handlemovie")
        console.log(this.state.movieId);
    }
    handleTheatre = (event) => {
        
    }


             }
            }