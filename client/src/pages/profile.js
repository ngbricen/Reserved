import React, { Component } from "react";
import ProfileEdit from "../components/ProfileEdit";
import { Col, Row, Container } from "../components/Grid";

class Profile extends Component {

  render() {
    return (
      <div className="containerProfile">
        <div className="heading">
          <h3 className="text-center">Your Profile</h3>
        </div>
        <Container fluid>
          <Row>
            <Col size="md-10 md-offset-1">
              <div className="panel">
                <div className="panel-heading"><i className="fa fa-user-circle-o"></i>Edit Profile</div>
                <div className="panel-body">
                  <ProfileEdit />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
	  )
	}
	
}  

 export default Profile;