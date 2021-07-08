import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import profile from './profile';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Footer from './components/Layout/Footer';
// import Alert from '../src/components/Layout/Alert';
// import Contact from './components/Contact/Contact';
import Routes from './components/Routing/Routes';
// import Footer from '../components/footer';
// import NoMatch from './NoMatch';
// import { loadUser } from '../actions/auth';
//import API from "../utils/API";
import Alert from './components/Layout/Alert';
//Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          {/* <Route path="/contact" component={Contact} /> */}
          <Route component={Routes} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
