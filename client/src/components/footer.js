import React, { Component } from "react";
import $ from "jquery";

class Footer extends Component {

  collapse() {
    $(".meetTeam").animate({
        height: 0
    }, 1000);    
  }

  render() {

    return (
      <footer>
        <div className="meetTeam">
          <div className="teamTitle" onClick={this.collapse}><button type="button" className="close">&times;</button></div>

           <div className="personContainer">
            <div className="personHeader">
              <img src="images/Brice.png" width="50" alt="" />
              <span className="personTitle">Brice Nguoghia</span>
            </div>
            <ul className="personBody">
              <a href="mailto:Bricen@gmail.com" target="_blank" rel="noopener noreferrer"><li>Bricen@gmail.com</li></a>
              <a href="https://github.com/ngbricen"><li>GitHub Profile</li></a>
              <a href="https://www.linkedin.com/in/bricenguoghia/"><li>LinkedIn Profile</li></a>
            </ul>
          </div> 

          <div className="personContainer">
            <div className="personHeader">
              <img src="images/David.png" width="50" alt="" />
              <span className="personTitle">David Rosenberg</span>
            </div>
            <ul className="personBody">
              <a href="mailto:dsr0116@yahoo.com" target="_blank" rel="noopener noreferrer"><li>dsr0116@yahoo.com</li></a>
              <a href="https://github.com/davesrose"><li>GitHub Profile</li></a>
              <a href="https://www.linkedin.com/in/david-s-rosenberg/"><li>LinkedIn Profile</li></a>
            </ul>
          </div>
        </div>
        <div className="left">&copy;2017 | Reserved</div>
        <div className="meetTeamLink">Meet the Team</div>
      </footer>
    )
  }
}
export default Footer;