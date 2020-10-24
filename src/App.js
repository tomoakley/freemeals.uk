import React from "react";
import { Router } from "react-router-dom";
import { Helmet } from "react-helmet";

import history from "services/history";
import Routes from "components/Routes";
import "App.css";

function App() {
  return (
    <>
      <Helmet>
        <title>#FreeSchoolMeals - No child should go hungry</title>
      </Helmet>
      <Router history={history}>
        <Routes />
      </Router>
    </>
  );
}

export default App;
