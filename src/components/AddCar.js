import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



class AddCar extends Component {
    constructor(props) {
        super(props);
        this.state = {brand: '', model: '', year: '', color: '', price: '', registerNumber: ''}
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let newCar = {
            brand: this.state.brand,
            model: this.state.model,
            year: this.state.year,
            color: this.state.color,
            price: this.state.price,
            registerNumber: this.state.registerNumber
        }
        this.props.addCar(newCar);
        this.addCarDialog.hide();
        this.setState({brand: '', model: '', year: '', color: '', price: '', registerNumber: ''});
    }
    cancelSubmit = (event) => {
        event.preventDefault();
        this.addCarDialog.hide();
        this.setState({brand: '', model: '', year: '', color: '', price: '', registerNumber: ''});
    }
        
    render(){
        return (
            <div>
                <div>
                    <Button variant="contained" color="primary" style={{'margin': '10px'}} onClick={() => this.addCarDialog.show()}>New Car</Button>
                </div>
                <SkyLight hideOnOverlayClicked ref={ref => this.addCarDialog = ref}>
                    <h3>New car</h3>
                    <form id="newCarForm">
                        <TextField label="Brand" type="text" name="brand" value={this.state.brand} placeholder="Brand" onChange={this.handleChange}/><br/>
                        <TextField label="Model" type="text" name="model" value={this.state.model} placeholder="Model" onChange={this.handleChange} /><br/>
                        <TextField label="Year" type="number" name="year" value={this.state.year} placeholder="Year (e.g. 2020)" onChange={this.handleChange} /><br/>
                        <TextField label="Color" type="text" name="color" value={this.state.color} placeholder="Color" onChange={this.handleChange} /><br/>
                        <TextField label="Price" type="number" name="price" value={this.state.price} placeholder="Price" onChange={this.handleChange} /><br/>
                        <TextField label="Register number" type="text" name="registerNumber" value={this.state.registerNumber} placeholder="Register number" onChange={this.handleChange} /><br/><br/>
                        <Button variant="outlined" color="primary" onClick={this.handleSubmit} style={{'margin': '5px'}}>Save</Button>
                        <Button variant="outlined" color="secondary" onClick={this.cancelSubmit} style={{'margin': '5px'}}>Cancel</Button>
                    </form>
                </SkyLight>
            </div>
        );
    }
    
}
export default AddCar;