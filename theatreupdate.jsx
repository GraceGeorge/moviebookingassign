import axios from "axios";
import React, { Component } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
 
class Theatreupdate extends React.Component {
    state = {
        theatre : [],
        formValue:{
            theatreName: '',
            theatreLoc: '',
            capacity: '',
            rate: '',
        },
        fieldValidity: {
            theatreName: false,
            theatreLoc: false,
            capacity: false,
            rate: false,
        },

        formValid: false,
        successMessage: '',
        done: false
    };

    validateName = (event) => {
        var fieldValidity = this.state.fieldValidity;
        this.setState({ formValue: {...this.state.formValue, theatreName: event.target.value}});
        fieldValidity.theatreName=true;
        console.log(this.state.fieldValidity.theatreName);
        this.setState({ formValid: fieldValidity.theatreName && fieldValidity.theatreLoc && fieldValidity.capacity && fieldValidity.rate})
    }
    validateLocation = (event) => {
        var fieldValidity = this.state.fieldValidity;
        this.setState({ formValue:{...this.state.formValue, theatreLoc: event.target.value} });
        fieldValidity.theatreLoc=true;
        this.setState({ formValid: fieldValidity.theatreName && fieldValidity.theatreLoc && fieldValidity.capacity && fieldValidity.rate})

    }
    validateRate = (event) => {
        var fieldValidity = this.state.fieldValidity;
        this.setState({ formValue: {...this.state.formValue, rate: event.target.value}});
        fieldValidity.rate= true;
        this.setState({ formValid: fieldValidity.theatreName && fieldValidity.theatreLoc && fieldValidity.capacity && fieldValidity.rate})

      }
    validateCapacity = (event) => {
        var fieldValidity = this.state.fieldValidity;
        this.setState({ formValue: {...this.state.formValue, capacity: event.target.value}});
        fieldValidity.capacity= true;
        this.setState({ fieldValidity: fieldValidity})
        this.setState({ formValid: fieldValidity.theatreName && fieldValidity.theatreLoc && fieldValidity.capacity && fieldValidity.rate})

      console.log(this.state.formValid);
      console.log(this.state.fieldValidity);
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.register()
    }

    componentDidMount() {
        axios.get("http://localhost:8055/theatre/" +this.props.theatreId)
        .then(response => {
            this.setState({ theatre: response.data})
            console.log(this.state.theatre.theatreId)
            console.log(this.state.theatre.theatreName)
            this.setState({ formValue: {...this.state.formValue, theatreName: this.state.theatre.theatreName}});
            this.setState({ formValue: {...this.state.formValue, theatreLoc: this.state.theatre.theatreLoc}});
            this.setState({ formValue: {...this.state.formValue, rate: this.state.theatre.rate}});
            this.setState({ formValue: {...this.state.formValue, capacity: this.state.theatre.capacity}});
        });
    }

    register = () => {
        const theatre = {
            theatreId : this.props.theatreId,
            theatreName : this.state.formValue.theatreName,
            rate : this.state.formValue.rate,
            capacity : this.state.formValue.capacity,
            theatreLoc : this.state.formValue.theatreLoc
        };

        axios
          .post("http://localhost:8055/theatre/update/" +this.props.theatreId, theatre)
          .then(response => {
              this.setState({ successMessage: response.data.message, error: ""});
              this.setState({done:true});
              console.log(response.data);

          })
          .catch(error => {
              if(error.response) {
                  this.setState({ error: error.response.data.message, success: ""});
                  alert("Enter the correct details")
              } else {
                  this.setState({ error: error.message, sucess: ""});
              }
          });
    };

    render() {
        if(this.state.done) {
            return <Navigate to="/theatre" />

        }
        return (
            <div style={{ width: 500, margin: '0px auto'}}>
                <form>
                    <h3 className="text-center">Update Theatre</h3>
                    <div className="form-group">
                        <label>Theatre Id</label>
                        <input className="form-control" value = {this.state.theatre.theatreId} disabled/>
                    </div>
                    <div className="form-group">
                        <label>Theatre Name</label>
                        <input className="form-control" onChange={this.validateName} placeholder={this.state.theatre.theatreName/>
                    </div>
                </form>
            </div>
        )
    }
}