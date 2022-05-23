import React, {Component} from "react";
import './HRCompletedDashboard.css';

import Login from "../components/Login/Login"
import Register from "../components/Register/Register"

class Home extends Component {

   render() {
     return (
     <div>
       <div className="row">
          <div className="col-md-12">
             <h2>Coach.ai</h2>
          </div>
       </div>
       <div className="row">
          <div className="col-md-9" style={{background: "wheat"}}>
          </div>
          <div className="col-md-3">
             {true && <Login />}
             {false && <Register />}
          </div>
       </div>
     </div>
     )}
};

export default Home;
