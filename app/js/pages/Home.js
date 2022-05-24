import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Home.css"

import Login from "../components/Login/Login"

function Home() {

    const navigate = useNavigate(); // <-- call hook to get navigate function

    return (
     <div className="home-container">
       <div className="row">
          <div className="col-md-2">
             <a href="https://coach.ai">
               <img src="/images/logo_coach_ai.png" width="150px"/>
             </a>
          </div>
          <div className="col-md-10">
             <h2></h2>
          </div>
       </div>
       <div className="row">
          <div className="col-md-4" >
          </div>
          <div className="col-md-4">
             <Login navigate={{navigate}} />
          </div>
          <div className="col-md-4">
          </div>
       </div>
     </div>
     )
}


export default Home;
