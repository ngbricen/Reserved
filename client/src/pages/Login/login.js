import React, { Component } from "react";
import API from "../../utils/API";
import { Input, FormBtn } from "../../components/Form";
import $ from "jquery";

class Login extends Component {
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
      API.authenticate({
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        if (res.data.success === false) {
          setTimeout(() => {
            alert("Authentication failed.  Try again or Sign Up");
          }, 1000);
        } else {
          this.setState({ user: res.data.response, email: "", password: ""});
          document.getElementById("loginSubmit").dataset.dismiss = "modal";
          $("#loginModal").hide();
          document.getElementById("logInBttn").innerHTML = "<p>Log Out</p>";

          //Store the token in a session
          window.localStorage.setItem('token', res.data.token);
        }
    })
      .catch(err => console.log(err));
    }
  };

  render() {
    return (
     <div id="modalSignIn" className="modal fade" role="dialog">
      <div className="modal-dialog">

        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Log In</h4>
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
                </form>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.handleFormSubmit}>Submit</button>
          </div>
        </div>

      </div>
    </div>
    );
  }
}

export default Login;

            // <Panel icon="fa fa-list-alt" heading="Search Parameters">