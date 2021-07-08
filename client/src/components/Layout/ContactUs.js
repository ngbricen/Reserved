import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  // console.log(isAuthenticated);
  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard"></Redirect>;
  // }
  return (
    <div>
      <section className="contactus">
        <h1>Reach out to us for Additional Information</h1>
        <Link to="/contactus" className="Link-btn">
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default ContactUs;
