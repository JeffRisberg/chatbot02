import React from "react";
import {Link} from "react-router-dom";
import "./LinkToDashboard.css";

const LinkToDashboard = () => {

  return <div className="linkToDashboard">
    <Link to="/userDashboard" target="_blank">See my dashboard</Link>
  </div>
};

export default LinkToDashboard;
