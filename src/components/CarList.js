import React, { Component } from 'react';
import '../App.css';
import ReactTable from 'react-table-6';
import { confirmAlert } from 'react-confirm-alert';
import AddCar from './AddCar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { CSVLink } from 'react-csv';
import Snackbar from '@material-ui/core/Snackbar';

import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-table-6/react-table.css';


class CarList extends Component {
  constructor(props) {
    super(props);
    this.state = { cars: [], open: false, message: ''};
  }

  async componentDidMount(){
      try{
        await this.fetchCars();
      }catch(error){
          console.error(error);
      }
    }

  confirmDelete = (link) => {
    confirmAlert({
      message: 'Are you sure you want to delete this car?',
      buttons: [
            {
            label: 'Yes',
            onClick: () => {this.onDelClick(link)}
            },
            {
            label: 'No',
            }
        ]});
    }

    addCar = async (car) => {
        try {
            const token = sessionStorage.getItem("jwt");
            const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/cars`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(car)
            });
            const jsonResponse = await rawResponse.json();
            if(jsonResponse !== null){
                this.setState({open: true, message: 'New car created'})
                this.fetchCars();
            }
        }catch(err){
            this.setState({open: true, message: 'Error creating car'});
            console.error(err)
        };
    }

  onDelClick = async (link) => {
        try{
            const token = sessionStorage.getItem("jwt");
            const rawResponse = await fetch(link, {
                method: 'DELETE',
                headers: {
                   'Authorization': token
                }
            });
            if(rawResponse){
                this.setState({open: true, message: 'Car deleted'});
                this.fetchCars();
            }
        } catch(err){
            this.setState({open: true, message: 'Error when deleting'});
            console.error(err);
        }
    }

  fetchCars = async () => {
    try{
        const token = sessionStorage.getItem("jwt");
        const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/cars`, {
            headers: {
                'Authorization': token
            }
        });
        const jsonResponse = await rawResponse.json();
        if(jsonResponse){
            this.setState({cars: jsonResponse._embedded.cars});
        }
        }catch(err){
            console.error(err);
        };
    }

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.cars];
          data[cellInfo.index][cellInfo.column.id] =
           e.target.innerHTML;
          this.setState({ cars: data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.cars[cellInfo.index]
        [cellInfo.column.id]
        }} />
        ); 
    }

    updateCar = async (car, link) => {
        try{
            const token = sessionStorage.getItem("jwt");
            const rawResponse = await fetch(link,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body: JSON.stringify(car)
                });
            const jsonResponse = await rawResponse.json();
            if(jsonResponse){
                this.setState({open: true, message: 'Changes saved'})
            }
        }catch(err){
            this.setState({open: true, message: 'Error when saving'});
        }
        
    }

    handleClose = (event, reason) => {
        this.setState({ open: false });
   };

   logout = () => {
    sessionStorage.removeItem("jwt");
    this.setState({isAuthenticated: false})
  }
  
  render(){
    const data = this.state.cars;
    const columns = [
      {
        Header: 'Brand',
        accessor: 'brand',
        Cell: this.renderEditable
      },
      {
        Header: 'Model',
        accessor: 'model',
        Cell: this.renderEditable
      },
      {
        Header: 'Year',
        accessor: 'year',
        Cell: this.renderEditable
      },
      {
        Header: 'Color',
        accessor: 'color',
        Cell: this.renderEditable
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: this.renderEditable
      },
      {
        Header: 'License',
        accessor: 'registerNumber',
        Cell: this.renderEditable
      },
      {
        id: 'saveButton',
        sortable: false,
        filterable: false,
        width: 100,
        accessor: '_links.self.href',
        Cell: ({value, row}) => {return <Button size="small" color="primary" onClick={() => this.updateCar(row, value)}>Save</Button>}
      },
      {
        accessor: '_links.self.href',
        id: 'delButton',
        sortable: false,
        filterable: false,
        width: 100,
        Cell: ({value}) => {return <Button size="small" color="secondary" onClick={() => this.confirmDelete(value)}>Delete</Button>}
      }
      
    ]
    return (
      <div className="App">
        <Grid container>
            <Grid item>
                <AddCar addCar={this.addCar} fetchCars={this.fetchCars} />
            </Grid>
            <Grid item style={{padding: 20}}>
                <CSVLink data={this.state.cars} separator=",">Export CSV</CSVLink>
            </Grid>
       </Grid>        
        <ReactTable data={data} columns={columns} filterable={true}/>
        <Snackbar
         style = {{width: 300, color: 'green'}}
         open={this.state.open} onClose={this.handleClose}
         autoHideDuration={2500} message={this.state.message} />
      </div>
    );
  }
  
}
export default CarList;
