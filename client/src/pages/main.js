import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import aboutMS from "./about-ms";
import profile from "./profile"
import Nav from "../components/nav";
import Footer from "../components/footer"
import NoMatch from "./NoMatch";
//import API from "../utils/API";

function requireAuth(nextState, replace) {
    var token = window.localStorage.getItem('token');
    console.log("Entering Route Auth");
    if (!token) {
      replace({
          pathname: "/"
      })
    }
}

const Main = () =>
	<Router>
    	<div>
        <div className="mainContainer">
      		<Nav />
      		<Switch>
          		<Route exact path="/" component={aboutMS} />
              <Route path="/profile" component={profile} onEnter={requireAuth} />
          		<Route component={NoMatch} />
      		</Switch>
        </div>
        <Footer /> 		
    	</div>       
	</Router>;

export default Main;
