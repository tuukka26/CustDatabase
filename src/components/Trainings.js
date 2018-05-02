import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import Moment from 'react-moment';
import Notifications, {notify} from 'react-notify-toast';
import Addtraining from './Addtraining'

class Trainings extends React.Component {

  constructor(props) {
    super(props);
    this.state = { trainings: []};
  }

  componentDidMount() {
    this.loadTrainings();
  }

//Load all trainings from API
  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(res => res.json())
    .then(resData => {
      this.setState({trainings: resData});
    })
  }

  // Add training and link to customers
  addTraining = (newTraining) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newTraining)
      })
      .then(res =>
        this.loadTrainings())
  }

  // Delete a training
  deleteTraining = (value) => {
    fetch('https://customerrest.herokuapp.com/api/trainings/' + value, {method: 'DELETE'})
    .then(res =>
      this.loadTrainings())
      }

  render () {
    return(
      <div className="container">
        <h2>List of Trainings</h2>
        <div className="row">
          <Addtraining addTraining={this.addTraining} />
        </div>
        <ReactTable
          data={this.state.trainings}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              columns: [
                {
                  Header: "Date & Time (Finnish Time GMT+2)",
                  id: "date",
                  accessor: item => {
                      return <Moment format="MMMM Do YYYY">{item.date}</Moment>
                    },
                  filterable: false,
                  sortable: false
                },
                {
                  Header: "Duration (minutes)",
                  id: "duration",
                  accessor: item => item.duration,
                  filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ["duration"] }),
                  filterAll: true,
                  width: 200,
                },
                {
                  Header: "Activity",
                  id: "activity",
                  accessor: item => item.activity,
                  filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ["activity"] }),
                  filterAll: true
                },
                {
                  Header: "Customer",
                  id: "customer",
                  accessor: item => item.customer.firstname + " " + item.customer.lastname,
                  filterable: false,
                  sortable: false
                },
                {
                  Header: "Delete",
                  accessor: "id",
                  filterable: false,
                  sortable: false,
                  Cell: ({value}) => (<button type="button" class="btn btn-danger" onClick={() => {this.deleteTraining(value)}}>Delete</button>)
                },
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          />
      </div>
    );
  }
}

export default Trainings;
