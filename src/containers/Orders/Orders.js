import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount = () => {
    axios
      .get('/orders.json')
      .then(res => {
        // console.log('\n\nres.data: \n', res.data);
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            id: key,
            ...res.data[key]
          });
        }
        console.log('fetchedOrders: ', fetchedOrders);

        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => {
        console.log('err: ', err);
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
