import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        eleType: 'input',
        eleConfig: {
          type: 'text',
          plaveholder: 'Your Name'
        },
        value: ''
      },
      street: {
        eleType: 'input',
        eleConfig: {
          type: 'text',
          plaveholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        eleType: 'input',
        eleConfig: {
          type: 'number',
          plaveholder: 'ZIP Code'
        },
        value: ''
      },
      city: {
        eleType: 'input',
        eleConfig: {
          type: 'text',
          plaveholder: 'City'
        },
        value: ''
      },
      state: {
        eleType: 'input',
        eleConfig: {
          type: 'text',
          plaveholder: 'State'
        },
        value: ''
      },
      country: {
        eleType: 'input',
        eleConfig: {
          type: 'text',
          plaveholder: 'Country'
        },
        value: ''
      },
      email: {
        eleType: 'input',
        eleConfig: {
          type: 'email',
          plaveholder: 'Your Email'
        },
        value: ''
      },
      deliveryMethod: {
        eleType: 'select',
        eleConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: ''
      }
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    console.log('\n[ContactData.js]\nthis.props: ', this.props);
    this.setState({ loading: true });
    const orderData = {
      ingredients: this.props.ingredients,
      price: this.props.price
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
        <Input
          inputtype="input"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <Input
          inputtype="input"
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="Street"
        />
        <Input
          inputtype="input"
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
