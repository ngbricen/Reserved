import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Service from './Service';
import Location from './Location';
import Experience from './Experience';
import ContactUs from './ContactUs';

const Landing = () => {
  // console.log(isAuthenticated);
  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard"></Redirect>;
  // }
  return (
    <Fragment>
      <div className="landing-inner">
        <h1>Your IT & data solution of choice</h1>
        <p>
          Helping you with strategy, design and development of optimized and
          lean <br></br> data and IT solutions
        </p>
        <Link to="/contact" className="Link-btn">
          Contact us
        </Link>
      </div>
      <Service />
      <Location />
      <Experience />
      <ContactUs />
    </Fragment>
  );
};

export default Landing;
