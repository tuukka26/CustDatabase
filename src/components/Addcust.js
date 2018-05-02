import React, { Component } from 'react';
import SkyLight from 'react-skylight';

class Addcust extends Component {
  constructor(props) {
    super(props);
    this.state = { firstname: '',  lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''};
  }

  changeHandler = (event) => {
    this.setState ({
      [event.target.name]: event.target.value
    })
  }

  submitHandler = (event) => {
    event.preventDefault();

    const newCust = { firstname: this.state.firstname, lastname: this.state.lastname, streetaddress: this.state.streetaddress, postcode: this.state.postcode, city: this.state.city, email: this.state.email, phone: this.state.phone };
    this.props.addCust(newCust);
    this.addCustDialog.hide();
  }

  render () {
    return (

      <div>
        <SkyLight hideOnOverlayClicked ref={ref => this.addCustDialog = ref} title="Add new customer to database">
          <form>
            <div className="form-group">
              <input placeholder="First name" className="form-control" name="firstname" onChange={this.changeHandler} />
            </div>
            <div className="form-group">
              <input placeholder="Last name" className="form-control" name="lastname" onChange={this.changeHandler} />
            </div>
            <div className="form-group">
              <input placeholder="Street Address" className="form-control" name="streetaddress" onChange={this.changeHandler} />
            </div>
            <div className="form-group">
              <input placeholder="Post code" className="form-control" name="postcode" onChange={this.changeHandler} />
            </div>
            <div className="form-group">
              <input placeholder="City" className="form-control" name="city" onChange={this.changeHandler} />
            </div>
            <div className="form-group">
              <input placeholder="Email" className="form-control" name="email" onChange={this.changeHandler} />
            </div>
            <div className="form-group">
              <input placeholder="Phone" className="form-control" name="phone" onChange={this.changeHandler} />
            </div>
            <button className="btn btn-primary" onClick={this.submitHandler}>Save</button>
          </form>
        </SkyLight>
      <button style={{margin: 10}} className="btn btn-primary" onClick={() => this.addCustDialog.show()}>Add Customer</button>
    </div>
    );
  }
}

export default Addcust;
