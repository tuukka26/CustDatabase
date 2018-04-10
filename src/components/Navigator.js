import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigator extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link class="navbar-brand" to ="/">Customer Database</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <Link class="nav-item nav-link active" to="/" >Home</Link>
                <Link class="nav-item nav-link" to="/customers">Customers</Link>
                <Link class="nav-item nav-link" to="/trainings">Trainings</Link>
            </div>
          </div>
        </nav>
    );
  }
}

export default Navigator;
