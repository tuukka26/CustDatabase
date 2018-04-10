import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import matchSorter from 'match-sorter';

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
                  accessor: item => item.date,
                  filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ["date"] }),
                  filterAll: true
                },
                {
                  Header: "Duration",
                  id: "duration",
                  accessor: item => item.duration,
                  filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ["duration"] }),
                  filterAll: true
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
