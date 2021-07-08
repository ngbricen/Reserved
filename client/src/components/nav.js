import React, { Component } from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup"
import $ from "jquery";
import API from "../utils/API";

class Nav extends Component {
  constructor () {
    super()
    this.state = {
      isLoginHidden: true,
      isMessageLogout: false
    }
  }

  toggleHidden () {
    this.setState({
      isLoginHidden: !this.state.isLoginHidden
    })

    //Either Logout or Log in Customers as needed
    if (document.getElementById("logInBttn").innerHTML === "<p>Log Out</p>"){
      this.setState({
        isMessageLogout: true
      })
      $("#loginModal").hide();
      document.getElementById("logInBttn").innerHTML = "<p>Log In</p>";

      //Logout user
      API.logout()
        .then(res => {
        
        //Remove token from storage
        window.localStorage.setItem('token', "");

        window.location.href="/";
      })
      .catch(err => console.log(err));
    }
    // else{
    //   $("#loginModal").show();
    //   const signDiv = document.getElementById("signIn");
    //   const logDiv = document.getElementById("logIn");
    //   signDiv.style.display = "none";
    //   logDiv.style.visibility = "block";
    // }
  }

  hideSignIn = event => {
    
  }
  render() {

    return (
        <nav>
          <div className="name">OPEN</div>
          <div className="login">
            <div className="signin" data-toggle="modal" data-target="#modalSignIn">Log In</div>
            <div className="signup" data-toggle="modal" data-target="#modalSignUp">Sign Up</div>
          </div>
          <div className="clear"></div>
          <Login />
          <Signup />
        </nav>
    )
  }
}
export default Nav;

// data-toggle="modal" data-target="#loginModal"