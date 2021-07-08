import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Alert from '../Layout/Alert';
import Contact from '../Contact/Contact';
import NotFound from '../Layout/NotFound';

const Routes = (props) => {
  return (
    <section>
      {/* <Alert /> */}
      <Switch>
        <Route exact path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
