import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GeoProvider from "./components/GeoProvider";
import * as serviceWorker from "./services/serviceWorker.service";

ReactDOM.render(
  <React.StrictMode>
    <GeoProvider>
      <App />
    </GeoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.registerServiceWorker();
