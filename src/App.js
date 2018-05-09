import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Calendarview from './components/Calendarview';
import Navigator from './components/Navigator';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <div>
          <Navigator />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/customers" component={Customers} />
            <Route path="/trainings" component={Trainings} />
            <Route path="/calendar" component={Calendarview} />
          </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
