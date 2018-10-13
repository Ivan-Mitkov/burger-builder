import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layouts/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>

          {/* <BurgerBuilder></BurgerBuilder>
          <Checkout></Checkout> */}
        </Layout>
      </div>
    );
  }
}

export default App;
