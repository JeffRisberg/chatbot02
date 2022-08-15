import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserHistory } from "history";
import Frame from "./Frame";

import "./index.css";

import configureStore from "./store";

const history = createBrowserHistory({ basename: "/" });

const store = configureStore({ initialState: {}, history });

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="392712472664-gkqit9s9lent7621op0povgs4junkjae.apps.googleusercontent.com">
      <Frame />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("app-root")
);
