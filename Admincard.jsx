import React from "react"
import img2 from "./img2.jpg"
import bg from "./bg.jpg";
import { BrowserRouter as Router, Route, Switch, Link, Navigate, Routes} from "react-router-dom";

class AdminCards extends React.Component {
    constructor() {
        super();
    }
    render() {

    return (
        <div>
            <div className="card" style={{ width: 300, margin: '0px auto'}}>
                <img className="card-img-left" src={img2} height="200" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title text-center"></h5>
                    <p className="card-text" margin-left='1000000px'>
                        <div style={{width: 300, margin: 'auto'}}>
                            <h5>Theatre</h5><br />
                            </div>
                            <button type="button" onClick={this.handleSubmit} className="btn btn-success">Add</button>
                            { " " }
                            <button type="button" onClick={this.handleSubmit} className="btn btn-secondary">Update</button>
                            { " " }
                            <button type="button" onClick={this.handleSubmit} className="btn btn-danger">Delete</button>
                          </p>  
                        </div>
                    
                </div>
                { " " }
                <div className="card" style={{ width: 300, margin: '0px auto'}}>
                    <img className="card-img-left" src={img2} height="200" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title text-center"></h5>

                        <p className="card-text" margin-left = "1000000px">
                            <div style={{width: 300, margin: 'auto'}}>
                                <h5>Movies</h5><br />
                            </div>
                            <button type="button" onClick={this.handleSubmit} className="btn btn-success">
                             Add</button>
                             { " " }
                             <button type="button" onClick={this.handleSubmit} className="btn btn-secondary">
                             Update</button>
                             { " " }
                             <button type="button" onClick={this.handleSubmit} className="btn btn-danger">
                             Delete</button>
                        </p>
                    </div>
            </div>

            { " " }
            <div className="card" style={{ width: 300, margin: '0px auto'}}>
                <img className="card-img-left" src={img2} height="200" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title text-center"></h5>
                    <p className="card-text" margin-left='1000000px'>
                        <div style={{width: 300, margin: 'auto'}}>
                            <h5>Shows</h5>
                        </div>
                        <button type="button" onClick={this.handleSubmit} className="btn btn-success"> 
                        Add</button>
                        { " " }
                        <button type="button" onClick={this.handleSubmit} className="btn btn-secondary"> 
                        Update</button>
                        { " " }
                        <button type="button" onClick={this.handleSubmit} className="btn btn-danger"> 
                        Delete</button>
                    </p>
                </div>
            </div>

        </div>
    )
    }
}
export default AdminCards;
