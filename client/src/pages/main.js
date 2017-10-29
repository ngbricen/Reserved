import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import mainPage from "./main-page";
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
    	<div className="background">
      		<Nav />
      		<Switch>
          		<Route exact path="/" component={mainPage} onEnter={requireAuth} />
          		<Route component={NoMatch} />
      		</Switch>
        <Footer /> 		
    	</div>       
	</Router>;

export default Main;
