import React from "react";
import {connect} from 'react-redux';
import axios from "axios";
import {useGoogleLogin} from "@react-oauth/google";
import "./LandingPage.css";

import {set_user} from '../actions/user';
import {set_screen} from '../actions/screen';

function LandingPage(props) {
  const onLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {

      console.log("google login ---", tokenResponse);

      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
      );

      console.log("res ---", res);
      //props.set_user(response.data[0]);
      props.set_screen('home', '');
    },
  });

  return (
    <div className="landingPage-container">
      <div className="landingPage-container-wrapper">
        <div class="row" style={{height: "30px", marginBottom: "90px"}}>
          <div class="col-lg-2">
            <img src="/images/logo_priority.png" width="150px"/>
          </div>
          <div class="col-lg-5">
          </div>
          <div class="col-lg-1">
            <p class="text-base font-medium">Product</p>
          </div>
          <div class="col-lg-1">
            <p class="text-base font-medium">Contact Us</p>
          </div>
          <div class="col-lg-1">
            <p class="text-base font-medium">Features</p>
          </div>
          <div class="col-lg-2" style={{marginTop: "-30px"}}>
            <button onClick={onLogin} className="google-signin-btn">
              <img src="/images/button_talk_to_dara.png"/>
            </button>
          </div>
        </div>
        <div class="row" style={{marginBottom: "60px"}}>
          <div class="col-lg-1">
            &nbsp;
          </div>
          <div class="col-lg-4">
            <h2>Prioritize Your Time</h2>
            <br/>
            <svg width="444" height="49" viewBox="0 0 444 49" fill="none" xmlns="http://www.w3.org/2000/svg"
                 className="absolute left-[173px] top-[310px]" preserveAspectRatio="none">
              <path d="M4 45C67.3799 14.0604 243.312 -29.255 440 45" stroke="#2D7FE2" stroke-width="8"
                    stroke-linecap="round"></path>
            </svg>
            <br/>
            <p class="text-xl">Get your work done with the help of our AI personal assistant, Dara</p>
            <br/>
            <div class="col-lg-2" style={{marginTop: "-30px"}}>
              <button onClick={onLogin} className="google-signin-btn">
                <img src="/images/button_talk_to_dara.png"/>
              </button>
            </div>
          </div>
          <div class="col-lg-1">
            &nbsp;
          </div>
          <div class="col-lg-6">
            <img src="/images/landing_image_1.png"/>
          </div>
        </div>
        <div style={{margin: "0 auto", marginBottom: "60px"}}>
          <h2 style={{textAlign: "center"}}>Focus on your Top Tasks</h2>
          <img style={{display: "block", margin: 'auto'}} src="/images/landing_image_2.png"/>
        </div>
        <div class="row" style={{marginBottom: "60px"}}>
          <div class="col-lg-2">
            &nbsp;
          </div>
          <div class="col-lg-4">
            <h2>Set goals with our AI Assistant</h2>
            <p class="text-xl">Have access to your personal coach and goals anywhere
              you go through our integrated mobile application</p>
          </div>
          <div class="col-lg-4">
            <img src="/images/landing_image_3.png"/>
          </div>
          <div class="col-lg-2">
            &nbsp;
          </div>
        </div>
        <div class="row" style={{marginBottom: "60px"}}>
          <div class="col-lg-2">
            &nbsp;
          </div>
          <div class="col-lg-4">
            <h2>Personalize your environment</h2>
            <p class="text-xl">Create your ideal workspace and scheduling preferences with our expansive, customizable UI</p>
          </div>
          <div class="col-lg-4">
            <img src="/images/landing_image_4.png"/>
          </div>
          <div class="col-lg-2">
            &nbsp;
          </div>
        </div>
        <div class="row" style={{marginBottom: "60px"}}>
          <div class="col-lg-2">
            &nbsp;
          </div>
          <div class="col-lg-4">
            <h2>Track Your Goals</h2>
            <p class="text-xl">Create measurable goals and a plan of action with the help of our intelligent goal setting process</p>
          </div>
          <div class="col-lg-4">
            <img src="/images/landing_image_5.png"/>
          </div>
          <div class="col-lg-2">
            &nbsp;
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  content: state.app.content
});

export default connect(
  mapStateToProps,
  {set_user, set_screen}
)(LandingPage);
