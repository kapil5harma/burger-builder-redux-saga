import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuiilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

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
  componentDidMount = () => {
    this.props.onTryAutoSignUp();
  };

  render() {
    return (
      <div>
        <Layout>
          {/* // Lines added to just test that unmount gets called once BurgerBuilder is hidden.
          {this.state.show ? <BurgerBuilder /> : null} */}

          {/* <BurgerBuilder /> */}
          {/* <Checkout /> */}
          {/* <Route path="/checkout" exact component={Checkout} /> */}
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
