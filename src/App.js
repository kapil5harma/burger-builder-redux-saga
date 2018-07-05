import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuiilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  // Lines added to just test that unmount gets called once BurgerBuilder is hidden.
  // state = {
  //   show: true
  // };

  // componentDidMount = () => {
  //   setTimeout(() => {
  //     this.setState({ show: false });
  //   }, 5000);
  // };

  render() {
    return (
      <div>
        <Layout>
          {/* // Lines added to just test that unmount gets called once BurgerBuilder is hidden.
          {this.state.show ? <BurgerBuilder /> : null} */}

          {/* <BurgerBuilder /> */}
          <Route path="/" exact component={BurgerBuilder} />
          {/* <Checkout /> */}
          <Route path="/checkout" exact component={Checkout} />
        </Layout>
      </div>
    );
  }
}

export default App;
