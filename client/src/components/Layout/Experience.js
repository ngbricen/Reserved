import React from 'react';

const Experience = () => {
  // console.log(isAuthenticated);
  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard"></Redirect>;
  // }
  return (
    <div>
      <section className="experience">
        <h1>Our Skills and Expertise</h1>
        <p>We cater to your every data and IT worldwide</p>
        <div className="row">
          <div className="experience-col">
            <img src="../../images/Database.jpg" alt="Database" />
            <h3>DATABASE</h3>
            <ul>
              <li>
                <i className="fas fa-angle-right"></i> Relational: SQL Server,
                Oracle, MySQL
              </li>
              <li>
                <i className="fas fa-angle-right"></i> Non-Relational: MongoDB
              </li>
              <li>
                <i className="fas fa-angle-right"></i> Cloud: AWS, Azure
              </li>
            </ul>
          </div>
          <div className="experience-col">
            <img src="../../images/Cloud4.jpeg" alt="Cloud" />
            <h3>CLOUD TECHNOLOGIES</h3>
            <ul>
              <li>
                <i className="fas fa-angle-right"></i> Data Lift and Shift: AWS,
                Azure
              </li>
              <li>
                <i className="fas fa-angle-right"></i> BI, ETL, Storage,
                Data warehouse: AWS, Azure
              </li>
              <li>
                <i className="fas fa-angle-right"></i> Other: DevOps, Jira
              </li>
            </ul>
          </div>
          <div className="experience-col">
            <img src="../../images/Analytics3.jpg" alt="Analytics" />
            <h3>ANALYTICS</h3>
            <ul>
              <li>
                <i className="fas fa-angle-right"></i> Traditional BI: MS SQL Server, Reporting Services
              </li>
              <li>
                <i className="fas fa-angle-right"></i> Data Visualization: PowerBI, Tableau, Qlik
              </li>
              <li>
                <i className="fas fa-angle-right"></i> Cloud Analytics: AWS, Azure
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;
