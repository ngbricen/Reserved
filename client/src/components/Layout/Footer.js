import React from 'react';

const Footer = () => {
  // console.log(isAuthenticated);
  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard"></Redirect>;
  // }
  return (
    <div>
      <section className="footer">
        <hr></hr>
        <h4>&copy;2021 | Reserved, LLC</h4>
        <div className="icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-linkedin"></i>
        </div>
      </section>
    </div>
  );
};

export default Footer;
