import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { backendUrlRegister} from "../backendURL";
import { Users } from "./models/User";
 
class Register extends React.Component {
    state = {
        formValue:{
            userName: '',
            password: '',
            phoneNo: '',
            email: '',
        },
        formErrors: {
            userNameErr: '',
            passwordErr: '',
            phoneNoErr: '',
            emailErr: '',
            roleErr: '',
            
        },
        fieldValidity: {
            userName: false,
            password: false,
            phoneNo: false,
            email: false,
        },
        formValid: false,
        successMessage: '',
        registered:false,

    };
    componentDidMount() {
        axios.get("http://localhost:8055/u/test")
        .then(response => console.log(response.data));
    }
    validateUserName = (event) => {
        const name = event.target.value;
        var formErrors = this.state.fieldValidity;
        this.setState({ formValue: {...this.state.formValue, userName: event.target.value}});
        if(name.length < 3) {
            formErrors.userNameErr = "Name must be at least 3 chars";
            fieldValidity.userName = false;
        }
        else {
            formErrors.userNameErr = "";
            fieldValidity.userName = true;
        }
        this.setState({ fieldValidity: fieldValidity})
        this.setState({ formValid: fieldValidity.userName && fieldValidity.email && fieldValidity.password && fieldValidity.phoneNo})
    }
    validatePassword = (e) => {
        const name = e.target.value;
        this.setState({ formValue: {...this.state.formValue, password: e.target.value}});
        var formErrors = this.state.formErrors;
        var fieldValidity = this.state.fieldValidity;
        var errorMessage = "";

        if(password) {
            var regexCAp = new RegExp(/^.*[A-Z].*$/);
            var regexLow = new RegExp(/^.*[A-Z].*$/);
            var regexNum = new RegExp(/^.*[A-Z].*$/);
            var regexSpecialChar = new Regexp(/^.*[!@#$%^&*].*$/);
             
            errorMessage = !regexCAp.test(password)
              ? errorMessage + "Should contain atleast one uppercase letter," : errorMessage;
            errorMessage = !regexLow.test(password)
              ? errorMessage + "Should contain atleast one lowercase letter," : errorMessage;
            errorMessage = !regexNum.test(password)
              ? errorMessage + "Should contain atleast one number," : errorMessage;
            errorMessage = !regexSpecialChar.test(password)
              ? errorMessage + "Should contain atleast one special character," : errorMessage;
            errorMessage = !(password.length >= 7 && password.length <= 20)
              ? errorMessage + "Should be 7 to 20 character long" : errorMessage;
            }

        if (errorMessage !== ""){
            formErrors.passwordErr = errorMessage
            fieldValidity.password = false
            this.setState({sameErrorMessage: formErrors});
        }   
        else {
            formErrors.passwordErr = ""
            fieldValidity.password = true
            this.setState({ formErrorMessage: formErrors});
        }
            this.setState({ formErrors: formErrors});
            this.setState({ formValid: fieldValidity.userName && fieldValidity.email && fieldValidity.password && fieldValidity.phoneNo})

        }
         
        validatePhoneNo = (event) => {
            const value = event.target.value;
            var formErrors = this.state.formErrors;
            var fieldValidity = this.state.fieldValidity;
            this.setState({ formValue: {...this.state.formValue, userName: event.target.value}});
            console.log(this.state.formValue.phoneNo);

            var contactNoRegex = /^[6789][0-9]{9}$/;
                        if (value === "") {
                            formErrors.phoneNoErr = "Field Required";
                            fieldValidity.phoneNo = false;
                        }
                        else if (!value.match(contactNoRegex)) {
                            formErrors.phoneNoErr = "Please enter a valid contact number";
                            fieldValidity.phoneNo = false;

                        }
                        else {
                            formErrors.phoneNoErr = "";
                            fieldValidity.phoneNo = true;
                        }
                        this.setState({ fieldValidity: fieldValidity});
                        this.setState({ formValid: fieldValidity.userName && fieldValidity.email && fieldValidity.password && fieldValidity.phoneNo})
                    }
    validateEmail = (event) => {
    
            const value = event.target.value;
            var formErrors = this.state.formErrors;
            var fieldValidity = this.state.fieldValidity;
            this.setState({ formValue: {...this.state.formValue, email: event.target.value}});
            if(value === "") {
                formErrors.email = "Fiels Required";
                fieldValidity.email = false;
            }
            else if (!value.match(/^\w+@\w+\.com/)) {
                formErrors.emailErr = "Please enter valid email"
                fieldValidity.email = false
            }
            else {
                formErrors.emailErr = ""
                fieldValidity.email = true
            }
            this.setState({ fieldValidity: fieldValidity})
            this.setState({ formValid: fieldValidity.userName && fieldValidity.email && fieldValidity.password && fieldValidity.phoneNo})
    }
    validate = (e) => {
        let salary = e.target.value;
        this.setState({ salary: salary})
    }
    validate = (e) => {
        let achievement = e.target.value;
        this.setState({ achievements: achievements})
    }
    update = (e) =>
    {
        e.preventDefault()
        if(this.state.formValid) {
            var formJSON = {
                empId: this.props.match.params.empId,
                empName: this.state.empName,
                age: this.state.age,
                salary: this.state.salary,
                achievements: this.state.achievements

            }
            console.log(JSON.stringify(formJSON));
            this.setState({ successMessage: JSON.stringify(formJSON)});
        }
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.register
    }
    register = () => {
        const user = {
            userName: this.state.formValue.userName,
            password: this.state.formValue.password,
            phoneNo: this.state.formValue.phoneNo,
            emailId: this.state.formValue.email,
            role:"user"
        };
        console.log(user);
         
         axios
           .post("http://localhost:8055/u/r", user)
           .then(response => {
               this.setState({ successMessage: response.data.message, erroe: ""});
               console.log(response.data);
               alert(response.data)
               this.setState({ registered:true})
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
            if(this.state.registered) {
                return <Navigate to="/login"/>
            }
            return (
                <div style={{ width: 500, margin: '0px auto'}}>
                    <form>
                        <h3 className="text-center">Registration Form</h3>
                           <div className="form-group">
                               <label> UserName </label>
                               <input className="form-control" onChange={this.validateUserName} value={this.state.formValue.userName}/> 
                            
                           </div>
                           <span className="text-danger">{this.state.formErrors.userNameErr}</span>
                           <div className="form-group">
                               <label> Password: </label>
                               <input className="form-control" type="password" onChange={this.validatePassword} value={this.state.password}/> 
                            
                           </div>
                           <span className="text-danger">{this.state.formErrors.userNameErr}</span>

                           <div className="form-group">
                               <label> Phone No: </label>
                               <input className="form-control" onChange={this.validatePhoneNo} value={this.state.phoneNo}/> 
                            
                           </div>
                           <span className="text-danger">{this.state.formErrors.phoneNoErr}</span>
                           
                           <div className="form-group">
                               <label> Email: </label>
                               <input className="form-control" onChange={this.validateEmail} value={this.state.email}/> 
                            
                           </div>
                           <span className="text-danger">{this.state.formErrors.emailErr}</span>
                           <button type="button" onClick={this.handleSubmit} className="btn btn-sucess" disabled={!this.state.formValid}>
                               Register
                           </button><br />
                           <span className="text-sucess">{this.state.successMessage}</span>
                       





                    </form>
                </div>
            );
        }
    }

export default Register;
            
