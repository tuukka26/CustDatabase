import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigator extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to ="/">Customer Database</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link className="nav-item nav-link active" to="/" >Home</Link>
                <Link className="nav-item nav-link" to="/customers">Customers</Link>
                <Link className="nav-item nav-link" to="/trainings">Trainings</Link>
            </div>
          </div>
        </nav>
    );
  }
}

export default Navigator;
