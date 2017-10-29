import React, { Component } from "react";
import API from "../../utils/API";
import { Input, FormBtn } from "../../components/Form";
import $ from "jquery"

class Signup extends Component {
  state = {
    user: [],
    email: "",
    password: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {

      const email = this.state.email;
      const re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(email)) {
          API.register({
            email: this.state.email,
            password: this.state.password
          })
          .then(res => {
            if (res.data.success === false) {
              setTimeout(() => {
                  alert("This email address has already been registered. Please try another email");
              }, 1000);
            }
            else{
              this.setState({ user: res.data.response, email: "", password: ""});
              document.getElementById("signupSubmit").dataset.dismiss = "modal";
              $("#loginModal").hide();
              document.getElementById("logInBttn").innerHTML = "<p>Log Out</p>";

              //Store the token in a session
              window.localStorage.setItem('token', res.data.token);
            }
          })
          .catch(err => {
            if (err === "Error: Request failed with status code 422") alert("email already used");
            console.log(err);

          });

      } else {
        alert("enter a valid e-mail address");
      }
    }
  };
  
  render() {
    return (
    <div id="modalSignUp" className="modal fade" role="dialog">
      <div className="modal-dialog">

        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title" id="signInLabel">Sign Up</h4>
          </div>
          <div className="modal-body">
            <form>
                <Input
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  name="email"
                  placeholder="email"
                />
                <Input
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  name="password"
                  placeholder="password"
                  type="password"
                />
              <Input value={this.state.confirm} onChange={this.handleInputChange} placeholder="Confirm Password" name="confirm" type="password" />
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Submit</button>
          </div>
        </div>

      </div>
    </div>
    );
  }
}

export default Signup;
