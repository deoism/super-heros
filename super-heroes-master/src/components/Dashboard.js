import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = props => {
  const heroTitles = props.heroes.map(hero => (
    <Link key={hero.id} className="col-1-4" to={`heroes/details/${hero.id}`}>
      <div className="module hero">
        <h4>{hero.superhero}</h4>
      </div>
    </Link>
  ));
  return (
    <div>
      <h3>Super Hero Home</h3>
      <div className="grid grid-pad">{heroTitles}</div>
    </div>
  );
};
export default Dashboard;
