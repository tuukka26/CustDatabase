import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import Moment from 'react-moment';

class Trainings extends React.Component {

  constructor(props) {
    super(props);
    this.state = { trainigs: []};
  }

  componentDidMount() {
    this.loadTrainings();
  }

//Load all trainigs from API
  loadTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then(res => res.json())
    .then(resData => {
      this.setState({trainings: resData.content});
    })
  }

  render () {
    return(
      <div className="container">
        <h2>List of Trainings</h2>
        <ReactTable
          data={this.state.trainings}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              columns: [
                {
                  Header: "Date",
                  id: "date",
                  accessor: item => {
                      return <Moment format="DD/MM/YYYY HH:mm">{item.date}</Moment>
                    },
                  filterable: false,
                  sortable: false
                },
                {
                  Header: "Duration",
                  id: "duration",
                  accessor: item => {
                      return <div>{item.duration} minutes</div>
                  },
                  filterable: false,
                  sortable: false,
                },
                {
                  Header: "Activity",
                  id: "activity",
                  accessor: item => item.activity,
                  filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ["activity"] }),
                  filterAll: true
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
