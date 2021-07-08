import React from 'react';

const Location = () => {
  // console.log(isAuthenticated);
  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard"></Redirect>;
  // }
  return (
    <div>
      <section className="location">
        <h1>Where we are Located</h1>
        <p>There are many services being offered by our firm worldwide</p>
        <div className="row">
          <div className="location-col">
            <img src="../../images/AtlantaBuilding2.jpg" alt="Atlanta" />
            <div className="layer">
              <h3>ATLANTA</h3>
            </div>
            <p>
              Our core team is based out of Atlanta, GA, USA
            </p>
          </div>
          <div className="location-col">
            <img src="../../images/Douala.jpg" alt="Douala" />
            <div className="layer">
              <h3>DOUALA</h3>
            </div>
            <p>
              We have supporting staff based out of Douala, Cameroon
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Location;
