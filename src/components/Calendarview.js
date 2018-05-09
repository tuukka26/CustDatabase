import React, { Component } from 'react';
import Calendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Link } from 'react-router-dom';

Calendar.momentLocalizer(moment);

class Calendarview extends React.Component {

  constructor(props) {
    super(props);
    this.state = { trainings: [] };
}

  componentDidMount() {
    this.loadTrainings();
  }

  //Load all trainings from API
    loadTrainings = () => {
      fetch('https://customerrest.herokuapp.com/api/trainings')
      .then(res => res.json())
      .then(resData => {
        this.setState({trainings: resData.content});
      })
    }

  render () {

      let evnts = [];

      for (var i = 0; i < this.state.trainings.length; i++) {
          console.log(i);
          let newEvent = { id: i, title: this.state.trainings[i].activity, start: new Date(moment.utc(this.state.trainings[i].date)), end: new Date(moment.utc(this.state.trainings[i].date).add(this.state.trainings[i].duration / 60, "hours")) };
          evnts.push(newEvent);
      }

      let calevents = evnts;

    return (

    <div className="container">
      <h2>Training Calendar</h2>
      <div className="btn-toolbar">
        <Link style={{margin: 10}} class="btn btn-link" to="/trainings">Back to list view</Link>
      </div>
        <Calendar
          defaultDate={new Date()}
          defaultView="month"
          events={calevents}
          onSelectEvent={event => alert("Activity: " + event.title + "\nDate and time: " + moment(event.start).format('MMMM Do YYYY, H:mm'))}
          style={{ height: "100vh" }}
        />
    </div>
  )
  }
}

export default Calendarview;
