import React, { Component } from "react";
import yelp from "../keys/yelp";
import $ from "jquery";

class MainPage extends Component {
	state = {
		businesses: []
	}

	yelp = event => {
		let business = [];
		let search = "clubs";
		let location = "Atlanta+GA";
		if ($("#search").val()) search = $("#search").val().trim();
		if ($("#location").val()) location = $("#location").val().trim();
		var data = null;

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function () {
		  if (this.readyState === 4) {
		  	const resp = JSON.parse(this.responseText);

		    resp.businesses.map(resp => {
		    	business.push(resp);
		    })
		  }
		});

		xhr.open("GET", "https://api.yelp.com/v3/businesses/search?term="+search+"&location="+location);
		xhr.setRequestHeader("authorization", "Bearer "+yelp.Token);
		xhr.setRequestHeader("cache-control", "no-cache");
		xhr.setRequestHeader("postman-token", yelp.Postman);

		xhr.send(data);
		console.log(business);
		this.setState({ businesses: business });
		setTimeout(() => {
			console.log(this.state.businesses);
		}, 2000);
		
	}

  render() {
    return (
        <div className="body">
          <div className="search">

            <div className="searchCont">

              <div className="searchField">
                <span className="find">Find</span>
                <input name="search" placeholder="Nighlife, drinks, dancing...." id="search" />
              </div>

              <div className="placeField">
                <span className="near">Near</span>
                <input name="place" placeholder="Atlanta, GA" id="location" />
              </div>

              <button type="submit" className="btn btn-danger" id="searchSub" onClick={this.yelp}><i className="fa fa-search fa-lg" aria-hidden="true"></i></button>

              <div className="clear"></div>

            </div>

          </div>
        </div>
	  )
	}
	
}  

 export default MainPage;