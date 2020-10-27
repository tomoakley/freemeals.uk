import React, { Suspense, useContext, useEffect, useState } from "react";
import { Router, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import history from "services/history";

import { AppContext } from "components/AppContext/AppContext";
import { GeoContext } from "components/GeoProvider";

import { BREAKPOINTS, ALL_PROVIDERS_LAMBDA, BASE_PROVIDERS_LAMBDA } from "./constants";

import Home from "containers/home";
import Map from "containers/map";
import Provider from "containers/provider";
import Footer from "components/ContributingFooter";
import NavSection from "components/NavSection";
import Route from "components/Routes/Route";
import { buildLocationsSet } from "./utils/buildLocationsSet";
import { getUniqueVenues } from "./utils/getUniqueVenues";
import { useDataApi } from "./hooks/useDataApi";

function App() {
  const [footerVisible, setFooterVisible] = useState(true);
  const { data, fetching, callApi } = useDataApi();
  const { isGeolocationAvailable, coords, mode } = useContext(GeoContext);
  const {
    setData,
    setLocations,
    setSelectedIndex,
  } = useContext(AppContext);

  // to be refactored
  let URL;
  if ((isGeolocationAvailable && mode === "geo") || mode === "postcode") {
    if (coords) {
      const {latitude, longitude} = coords
      URL = `${BASE_PROVIDERS_LAMBDA}?&coords=${latitude},${longitude}`;
    }
  } else {
    URL = ALL_PROVIDERS_LAMBDA
  }

  useEffect(() => {
      callApi(URL);
      if (data) {
        // first result contains null
        data.shift()

        const uniqueVenuesArray = getUniqueVenues(data);
        setData(uniqueVenuesArray);

        const locationsSet = buildLocationsSet(data);
        setLocations(["All", ...Array.from(locationsSet).sort()]);
      }
      //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching])

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <title>#FreeSchoolMeals - No child should go hungry</title>
        <meta
          property="og:title"
          content="#FreeSchoolMeals - No child should go hungry"
        />
        <meta
          property="og:description"
          content="Venues offering free meals to UK school children during half-term holidays. Because no child should go hungry."
        />
      </Helmet>
      <ListViewWrapper>
        <ListViewContainer>
          <Router history={history}>
            <NavSection setSelectedIndex={setSelectedIndex} />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/map" exact component={Map} />
              <Route
                exact
                path="/provider/:id"
                render={(args) => {
                  return (
                    <Suspense fallback={<div />}>
                      <Provider match={args.match} />
                    </Suspense>
                  );
                }}
              />
            </Switch>
          </Router>
        </ListViewContainer>
      {footerVisible && (
        <Footer setFooterVisible={setFooterVisible} />
      )}
      </ListViewWrapper>
    </>
  );
}

export default App;

const ListViewWrapper = styled.div`
  padding-top: 15px;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  max-width: ${BREAKPOINTS.max};
  @media screen and (min-width: ${BREAKPOINTS.md}) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const ListViewContainer = styled.div`
  display: grid;
  @media screen and (min-width: ${BREAKPOINTS.md}) {
    grid-template-columns: 200px 1fr;
    grid-gap: 30px;
  }
  @media screen and (min-width: ${BREAKPOINTS.lg}) {
    grid-gap: 50px;
  }
  @media screen and (min-width: ${BREAKPOINTS.xl}) {
    grid-gap: 70px;
  }
`;
