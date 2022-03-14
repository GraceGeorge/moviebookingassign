import { BrowserRouter as Router, Route, Switch, Link, Navigate, Routes} from "react-router-dom";
class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            director : "",
            genre: "",
            movieName: "",
            rating: "",
            buttonClicked: false,
            book: false,
            update: false
        }
    }
    handleLogin = () => {
        this.setState({book: true})
    }
    update = () => {
        this.setState({ update : true})
    }
    delete = () => {
        axios.delete("http://localhost:8055/movies/delete/"+this.props.s.movieId)
        .then(response => {
            alert(response.data)
            window.location.reload(false);
            });
    }

    render() {
        if(this.state.update) {
            return <Navigate to={"/movie/update/" + this.props.s.movieId}></Navigate>
        }
        return (
            <div className="cards" style={{ width: 500, margin: '0px auto'}}>

                <img className="card-img-bottom" src={img2} height="200" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title text-center">{this.props.s.movieName}</h5>
                    <p className="card-text">
                        <span>Director : {this.props.s.director}</span><br/>
                        <span>Genre : {this.props.s.genre}</span><br/>
                        <span>rating : {this.props.s.rating}</span><br/>
                        
                    </p>
                    { " " }

                    <button type="button" onClick= {this.update} className="btn btn-secondary">
                        Update
                    </button>
                    { " " }
                    <button type="button" onClick= {this.delete} className="btn btn-danger">
                        Delete
                    </button>

                </div>
            </div>
        )
    }

    }
    export default Cards;