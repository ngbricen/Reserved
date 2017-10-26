import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import $ from "jquery";

// const submitStyle = {
//   "background-color": "#6c99c9"
// }

class Login extends Component {
  state = {
    user: [],
    email: "",
    password: "",
    showModal: true
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
      <div id="logIn">
        <Container fluid>
          <Row>
            <Col size="md-10 md-offset-1">

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
                  <FormBtn
                    disabled={!this.state.email || !this.state.password}
                    onClick={this.handleFormSubmit}
                    id="loginSubmit"
                    style={this.submitStyle}
                  >
                    Submit
                  </FormBtn>
                </form>
              
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;

            // <Panel icon="fa fa-list-alt" heading="Search Parameters">