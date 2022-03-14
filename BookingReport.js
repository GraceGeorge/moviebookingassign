import BookingReport from "./calendertry";
import { Navigate } from "react-router-dom";
class BookingReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            movies: [],
            name:'',
            startDate : '',
            endDate : '',
            startDateEr : false,
            endDateEr : false,
            startValid: false,
            endValid : false,
            valid: false,
            user: {
                "userId": sessionStorage.getItem("userId"),
                "userName": sessionStorage.getItem("userName");
             }
       };
    }

    handleStart= (event) => {
        var value = event.target.value;
        this.setState({ startDate:event.target.value})
        console.log("startdate"+this.state.startDate)
        var startDateEr = this.state.startDateEr;
        if(value ==="") {
            startDateEr = "Field Required"
        }
        else {
            startDateEr= ""
            this.setState({startValid:true})
            this.setState({endValid:true})
            console.log(this.state.startValid)
            console.log(this.state.endDate)
        console.log(this.state.endValid)
            this.setState({valid:this.state.startValid && this.state.endValid})
        this.setState({ show:false});
        }
    }
    handleEnd=(event) => {
        var value=event.target.value;
        this.setState({ endDate:event.target.value})
        console.log(value);
        var endDateEr = this.state.startDateEr;
        this.setState({ endValid:true })
        console.log("startdate"+this.state.startDate)
        console.log(this.state.endValid)
        console.log(this.state.valid)
        this.setState({ show : false});
    }
    handleSubmit = (event) => {
        if(this.state.startDate && this.state.endDate){
            this.setState({ show: true});}
        else{
            alert("Enter start date & end date")
        }
    disablePrev=()=>
    {
        var today,dd,mm,yyyy;
        today=new Date;
        dd=today.getDate()+1;
        mm=today.getMonth()+1;
        yyyy=today.getFullYear();
        return yyyy+"-"+mm+"-"+dd;
    }
    render() {
        if(this.state.user.userId===null) {
            alert("Please Login/Register to access full features")
            return <Navigate to="/login"></Navigate>
        }
        return (
            <div style={{ width: 1000, margin: '0px auto'}}>
                <h1 className="text-center">Booking Id</h1>
                <form>
                    <div className="form-group">
                        <div style={{ width: 500, margin: '0px auto'}}>
                            <label className="font-weight-bold">Start Date</label>
                            <input type='date' min="2022-02-07T14:47:57" max="2022-02-17T14:47:57" className="form-control" onChange={this.handleStart}></input>
                            <label className="font-weight-bold">End Date</label>
                            <input type='date' className="form-control" onChange={this.handleEnd}></input><br></br>

                            <button type="button" onClick={this.handleSubmit} className="btn btn-success" >Search</button><br />

                        </div>
                    </div>
                </form>
                {this.state.show ? (<BookingReport1 startDate={this.state.startDate} endDate={this.state.endDate}></BookingReport1>):null}
            </div>

        )

      }
    }
}
export default BookingReport;


