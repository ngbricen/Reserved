import React, { Component } from "react";

class MainPage extends Component {

  render() {
    return (
        <div className="body">
          <form className="search">

            <div className="searchCont">

              <div className="searchField">
                <span className="find">Find</span>
                <input name="search" placeholder="Nighlife, drinks, dancing...." />
              </div>

              <div className="placeField">
                <span className="near">Near</span>
                <input name="place" placeholder="Atlanta, GA" />
              </div>

              <div className="clear"></div>

            </div>

          </form>
        </div>
	  )
	}
	
}  

 export default MainPage;