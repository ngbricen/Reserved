import React from 'react';

const Service = () => {
  // console.log(isAuthenticated);
  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard"></Redirect>;
  // }
  return (
    <div>
      <section className="service">
        <h1>Services we Offer</h1>
        <p>We have the ability to deliver worldwide in multiple languages</p>
        <div className="row">
          <div className="service-col">
            <h3>Business Intelligence</h3>
            <p>We provide Strategy through Implementation Services</p>
            <ul>
              <li>
                <i className="fas fa-angle-right"></i> Report and Data
                Visualization Development
              </li>
              <li>
                <i className="fas fa-angle-right"></i> Database Development (SQL
                Server Certified)
              </li>
              <li>
                <i className="fas fa-angle-right"></i> Lift and Shit to the
                Cloud (AWS/Azure Certified)
              </li>
              <li>
                <i className="fas fa-angle-right"></i> Manual Calculations and
                Processes Automation
              </li>
            </ul>
          </div>
          <div className="service-col">
            <h3>IT Projets Mangement & Oversight</h3>
            <p>We come with extensive experience consulting experience</p>
            <ul>
              <li>
                <i className="fas fa-angle-right"></i> IT & Data Program /
                Project Management
              </li>
              <li>
                <i className="fas fa-angle-right"></i> Interim C-Level &
                Director Data & Analytics Services Assistance
              </li>
              <li>
                <i className="fas fa-angle-right"></i> Data Strategy through
                Implementation (Current/Future State and Roadmap)
              </li>
              <li>
                <i className="fas fa-angle-right"></i> Web App Development
                Oversight and Review
              </li>
            </ul>
          </div>
          <div className="service-col">
            <h3>Training</h3>
            <p>We deliver customized database and reporting training</p>
            <ul>
              <li>
                <i className="fas fa-angle-right"></i> Database Microsoft SQL Server Introduction
              </li>
              <li>
                <i className="fas fa-angle-right"></i> Reporting with PowerBI,
                Tableau or Qlik
              </li>
              <li>
                <i className="fas fa-angle-right"></i> Big Data, Data Lake and Cloud
                Inroduction
              </li>
              <li>
                <i className="fas fa-angle-right"></i> Azure and AWS Big Data Engineering
                Introduction
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
