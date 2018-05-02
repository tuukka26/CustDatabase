import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import Notifications, {notify} from 'react-notify-toast';
import Addcust from './Addcust';

class Customers extends React.Component {

  constructor(props) {
    super(props);
    this.state = { customers: [] };
  }

  componentDidMount() {
    this.loadCustomers();
  }

// Load all customers from API
  loadCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(res => res.json())
    .then(resData => {
      this.setState({customers: resData.content});
    })
  }

// Delete a customer
deleteCust = (value) => {
  fetch(value, {method: 'DELETE'})
  .then(res =>
    this.loadCustomers())
    notify.show('Customer deleted', 'warning', 3000)
}

// Add a customer
addCust = (newCust) => {
  fetch('https://customerrest.herokuapp.com/api/customers', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newCust)
  })
  .then(res =>
    this.loadCustomers())
    notify.show('Customer added', 'success', 3000)
}

  render () {
    return(
      <div className="container">
        <Notifications />
        <h2>List of Customers</h2>
        <div className="row">
          <Addcust addCust={this.addCust} />
        </div>
        <ReactTable
          data={this.state.customers}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              columns: [
                {
                  Header: "First name",
                  id: "firstname",
                  accessor: item => item.firstname,
                  filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ["firstname"] }),
                  filterAll: true
                },
                {
                  Header: "Last name",
                  id: "lastname",
                  accessor: item => item.lastname,
                  filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ["lastname"] }),
                  filterAll: true
                },
                {
                  Header: "Street Address",
                  id: "streetaddress",
                  accessor: item => item.streetaddress,
                  filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ["streetaddress"] }),
                  filterAll: true
                },
                {
                  Header: "Post Code",
                  id: "postcode",
                  accessor: item => item.postcode,
                  filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ["postcode"] }),
                  filterAll: true
                },
                {
                  Header: "City",
                  id: "city",
                  accessor: item => item.city,
                  filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ["city"] }),
                  filterAll: true
                },
                {
                  Header: "Email",
                  id: "email",
                  accessor: item => item.email,
                  filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ["email"] }),
                  filterAll: true
                },
                {
                  Header: "Phone",
                  id: "phone",
                  accessor: item => item.phone,
                  filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ["phone"] }),
                  filterAll: true
                },
                {
                  Header: "Delete",
                  accessor: "links[0].href",
                  filterable: false,
                  sortable: false,
                  Cell: ({value}) => (<button type="button" class="btn btn-danger" onClick={() => {this.deleteCust(value)}}>Delete</button>)
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

export default Customers;
