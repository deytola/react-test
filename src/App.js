import React, { Component } from 'react';
import Login from './components/Login';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import './App.css';



class App extends Component {
  
  render(){
    return (
      <div className="App">
        <AppBar position="static" color="default">
             <Toolbar>List of Cars</ Toolbar>
        </AppBar>
        <Login />
      </div>
    );
  }
  
}
export default App;
