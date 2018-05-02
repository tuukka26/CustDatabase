import React, { Component } from 'react';
import SkyLight from 'react-skylight';

class Addtraining extends Component {
  constructor(props) {
    super(props);
    this.state = { customers: [], date: '', duration: '', activity: '', customer: '' };
  }

  componentDidMount() {
    this.loadCustomers();
  }

  changeHandler = (event) => {
    this.setState ({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault();

    const newTraining = { date: this.state.date,  activity: this.state.activity, duration: this.state.duration, customer: this.state.customer };
    console.log(this.state.date + " - " + this.state.customer.firstname);
    this.props.addTraining(newTraining);
    this.addTrainingDialog.hide();
  }

  // Load all customers from API
    loadCustomers = () => {
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then(res => res.json())
      .then(resData => {
        this.setState({customers: resData.content});
      })
    }

  render () {

    let optionItems = this.state.customers.map((item) =>
                <option key={item.id} value={item.links[0].href}>{item.firstname} {item.lastname}</option>
            );

    return (

      <div>
        <SkyLight hideOnOverlayClicked ref={ref => this.addTrainingDialog = ref} title="Add new training to database">
          <form>
            <div className="form-group">
              <input placeholder="Date" className="form-control" name="date" type="date" onChange={this.changeHandler} />
            </div>
            <div className="form-group">
              <input placeholder="Activity" className="form-control" name="activity" onChange={this.changeHandler} />
            </div>
            <div className="form-group">
              <input placeholder="Duration (minutes)" className="form-control" name="duration" onChange={this.changeHandler} />
            </div>
            <div className="form-group">
              <select className="form-control" id="chooseCust" name="customer" onChange={this.changeHandler}>
                {optionItems}
              </select>
            </div>
            <button className="btn btn-primary" onClick={this.submitHandler}>Save</button>
          </form>
        </SkyLight>
        <button style={{margin: 10}} className="btn btn-primary" onClick={() => this.addTrainingDialog.show()}>Add new training</button>
      </div>
    )
  }
}

export default Addtraining;
