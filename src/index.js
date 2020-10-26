import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./services/serviceWorker.service";

import { GlobalStyle } from "components/Style";

import "bootstrap/dist/css/bootstrap.css";
import "normalize.css/normalize.css";

import App from "./App";
import AppContextProvider from "components/AppContext/AppContext";
import GeoProvider from "./components/GeoProvider";

ReactDOM.render(
  <React.StrictMode>
    <GeoProvider>
      <AppContextProvider>
        <GlobalStyle />
        <App />
      </AppContextProvider>
    </GeoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.registerServiceWorker();
