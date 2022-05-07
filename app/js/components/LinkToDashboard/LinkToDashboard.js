import React from "react";
import {NavLink} from "react-router-dom";
import "./LinkToDashboard.css";

const LinkToDashboard = () => {

  return <NavLink to="/userDashboard">See my dashboard</NavLink>
};

export default LinkToDashboard;
