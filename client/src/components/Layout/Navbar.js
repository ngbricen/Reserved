import React, {useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Navbar = () => {
  const [toggleButton, setToggleButton] = useState(true);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 700px)' });
  let navbarLinkStyle = null;

  if (isSmallScreen) {
    if (toggleButton) {
      navbarLinkStyle = {
        position: 'absolute',
        background: '#f44336',
        height: '100vh',
        width: '200px',
        top: '0',
        right: '-200px',
        textAlign: 'left',
        zIndex: '2',
        transition: '1s',
      };
    } else {
      navbarLinkStyle = {
        position: 'absolute',
        background: '#f44336',
        height: '100vh',
        width: '200px',
        top: '0',
        right: '0px',
        textAlign: 'left',
        zIndex: '2',
        transition: '1s',
      };
    }
  }

  // const authLinks = (
  //   <ul>
  //     <li>
  //       <Link to="/profiles">Developers</Link>
  //     </li>
  //     <li>
  //       <Link to="/posts">Posts</Link>
  //     </li>
  //     <li>
  //       <Link to="/dashboard">
  //         <i className="fas fa-user" />{' '}
  //         <span className="hide-sm">Dashboard</span>
  //       </Link>
  //     </li>
  //     {/* <li>
  //       <a onClick={logout} href="#!">
  //         <i className="fas fa-sign-out-alt" />{' '}
  //         <span className="hide-sm">Logout</span>
  //       </a>
  //     </li> */}
  //   </ul>
  // );

  const guestLinks = (
      <div style={navbarLinkStyle} className="navbar-links">
        <ul>
          <i
            className="fas fa-times"
            onClick={() => setToggleButton(true)}
            // onClick={setToggleButton(false)}
          ></i>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profiles">Core Team</Link>
          </li>
          {/* <li>
          <Link to="/register">Register</Link>
        </li> */}
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {/* <li>
          <Link to="/login">Login</Link>
        </li> */}
        </ul>
      </div>
  );

  return (
    <div className="mainContainer">
      <nav className="navbar">
        <Link to="index.html">
          <img src="./Logo.png" alt="IT Reserved" />
        </Link>
        {guestLinks}
        <i className="fas fa-bars" onClick={() => setToggleButton(false)}></i>
      </nav>
    </div>
  );
};

export default Navbar;
