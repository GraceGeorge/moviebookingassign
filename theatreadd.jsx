import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class Theatreadd extends React.Component {
    state={
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
        register: false
    };
    validateName = (event) => {
        var fieldValidity = this.state.fieldValidity;
        this.setState({formValue: {...this.state.formValue, theatreName: event.target.value}});
        fieldValidity.theatreName= true;
        this.setState({ fieldValidity: {...this.state.fieldValidity, theatreName: true}});
        this.setState({ formValid: fieldValidity.theatreName && fieldValidity.theatreLoc && fieldValidity.rate && fieldValidity.capacity})
    }
    validateLocation = (event) => {
        var fieldValidity = this.state.fieldValidity;
        this.setState({formValue: {...this.state.formValue, theatreLoc: event.target.value}});
        fieldValidity.theatreLoc= true;
        this.setState({ fieldValidity: {...this.state.fieldValidity, theatreLoc: true}});
        this.setState({ formValid: fieldValidity.theatreName && fieldValidity.theatreLoc && fieldValidity.rate && fieldValidity.capacity})
    }
    validateRate = (event) => {
        var fieldValidity = this.state.fieldValidity;
        this.setState({formValue: {...this.state.formValue, rate: event.target.value}});
        fieldValidity.rate= true;
        this.setState({ fieldValidity: {...this.state.fieldValidity, rate: true}});
        this.setState({ formValid: fieldValidity.theatreName && fieldValidity.theatreLoc && fieldValidity.rate && fieldValidity.capacity})
    }
    validateCapacity = (event) => {
        var fieldValidity = this.state.fieldValidity;
        this.setState({formValue: {...this.state.formValue, capacity: event.target.value}});
        fieldValidity.capacity= true;
        this.setState({ fieldValidity: {...this.state.fieldValidity, capacity: true}});
        this.setState({ formValid: fieldValidity.theatreName && fieldValidity.theatreLoc && fieldValidity.rate && fieldValidity.capacity})

        console.log(this.state.formValid);
        console.log(this.state.fieldValidity);
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.register()
    }
    register = () => {
        this.setState({register:true})
        const theatre = {
            theatreName: this.state.formValue.theatreName,
            theatreLoc: this.state.formValue.theatreLoc,
            rate: this.state.formValue.rate,
            capacity: this.state.formValue.capacity
        };
         axios
           .post("http://localhost:8055/theatre/add", theatre)
           .then(response => {
               this.setState({ successMessage: response.data.message, error: ""});
               console.log(response.data);
               alert(response.data)
           })
           .catch(error => {
               if (error.response) {
                   this.setState({ error: error.response.data.message, success: ""});
                   alert("Enter correct details")
               } else {
                   this.setState({ error: error.message, success: ""});
               }
           });
    };

    render() {
        if(this.state.register){
            return <Navigate to="/theatre"></Navigate>
        }
        return (
            <div style={{ width: 500, margin: '0px auto'}}>
                <form>
                    <h3 className="text-center">New Theatre</h3>
                    <div className="form-group">
                        <label>Theatre Name:</label>
                        <input className="form-control" onChange={this.validateName} value={this.state.formValue.theatreName} />
                    </div>
                    <div className="form-group">
                        <label>Location:</label>
                        <input className="form-control" onChange={this.validateLocation} value={this.state.formValue.theatreLoc} />
                    </div>
                    <div className="form-group">
                        <label>Rate:</label>
                        <input className="form-control" onChange={this.validateRate} value={this.state.formValue.rate} />
                    </div>
                    <div className="form-group">
                        <label>Capacity</label>
                        <input className="form-control" onChange={this.validateCapacity} value={this.state.formValue.capacity} />
                    </div><br></br>
                    <button type="button" onClick={this.handleSubmit} className="btn btn-success" disabled={!this.state.formValid} >
                        Add Theatre </button><br/>
                    <span className="text-success">{this.state.successMessage}</span>


                </form>
            </div>
        );
    }
    
}
export default Theatreadd;