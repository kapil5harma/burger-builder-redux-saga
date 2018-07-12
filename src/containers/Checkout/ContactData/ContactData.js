import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    console.log('\n[ContactData.js]\nthis.props: ', this.props);
    this.setState({ loading: true });
    const orderData = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Kapil',
        address: {
          street: 'Test Street 1',
          zipCode: '110084',
          city: 'Delhi',
          state: 'Delhi',
          country: 'India'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    axios
      .post('/orders.json', orderData)
      .then(response => {
        // console.log('response: ', response);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        // console.log('error: ', error);
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button clicked={this.orderHandler} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    console.log('Inside render of ContactData.js');
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact data:</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
