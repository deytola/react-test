import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CarList from "./CarList";
import Snackbar from '@material-ui/core/Snackbar';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', isAuthenticated: false, open: false};
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    login = async () => {
        try {
            const user = {
            username: this.state.username,
            password: this.state.password
        };
        const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const jwtToken = await rawResponse.headers.get('Authorization');
        if (jwtToken !== null) {
            sessionStorage.setItem("jwt", jwtToken);
            this.setState({isAuthenticated: true});
        }else{
            this.setState({open: true, message: 'Authentication failed!'})
        }
        }catch(err){
            console.error(err);

        }
    }
    handleClose = (event, reason) => {
        this.setState({ open: false });
   }; 

    render(){
        if(this.state.isAuthenticated === true){
            return (
                <CarList />
            );
        }else{
            return(
                <div>
                    <TextField label="Username" name="username" placeholder="Username" onChange={this.handleChange} /><br/>
                    <TextField label="Password" type="password" name="password" placeholder="Password" onChange={this.handleChange} /><br/><br/>
                    <Button variant="contained" color="primary" onClick={this.login}> Login </Button>
                    <Snackbar
                        style = {{width: 300, color: 'green'}}
                        open={this.state.open} onClose={this.handleClose}
                        autoHideDuration={2500} message="Authentication failed!" />
                </div>
            );
        }
    }
}
export default Login;