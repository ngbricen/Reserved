import React, { Component } from "react";
import SignUp from "../pages/Signup";
import LogIn from "../pages/Login";
import { Modal } from "react-bootstrap";
import $ from "jquery";

class UserLogin extends Component {
	constructor () {
    super()
    this.state = {
      isSignupHidden: false,
      modalTitle: "Log In"
    }
  }

	toggleSignupHidden () {
    this.setState({
      isSignupHidden: !this.state.isSignupHidden, modalTitle: this.state.isSignupHidden ? "Login" : "Register"
    })
    
    if (this.state.isSignupHidden === false){
    	const signInLink = document.getElementById("signInLink");
    	signInLink.style.display = "none";
    }
  }

  close() {
    //this.setState({ showModal: false });
    $("#loginModal").hide();
  }

  render() {
    return (

	  	<div id="loginModal">

		  <Modal.Dialog>
			      <Modal.Header>
			        <button type="button" className="close" data-dismiss="modal" onClick={this.close}>&times;</button>
			        <h4 className="modal-title">{this.state.modalTitle}</h4>
			      </Modal.Header>
			      <Modal.Body>
			      	<div>
			        	{this.state.isSignupHidden && <SignUp />}
			        	{!this.state.isSignupHidden && <LogIn />} 
			        	<a id="signInLink" onClick={this.toggleSignupHidden.bind(this)}>Sign Up</a>
			        </div>
			      </Modal.Body>
			      <Modal.Footer>
			        <button className="btn btn-default" data-dismiss="modal" onClick={this.close}>Close</button>
			      </Modal.Footer>
		  </Modal.Dialog>

	  	</div>
	  )
	}
}
export default UserLogin;