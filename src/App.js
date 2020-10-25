import React, { Suspense, useContext, useEffect } from "react";
import { Router, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { AppContext } from "components/AppContext/AppContext";
import { GeoContext } from "components/GeoProvider";
import history from "services/history";

import Home from "containers/home";
import Map from "containers/map";
import Provider from "containers/provider";

import Footer from "components/ContributingFooter";
import NavSection from "components/NavSection";
import Route from "components/Routes/Route";

export const buildAddressString = (provider) => {
  const ADDRESS_1 = provider["provider address 1"];
  const ADDRESS_2 = provider["provider address 2"];
  const COUNTY = provider["provider county"];
  const TOWN = provider["provider town/city"];
  const POSTCODE = provider["provider postcode"];

  const addressArray = [ADDRESS_1, ADDRESS_2, COUNTY, TOWN, POSTCODE].filter(
    (parts) => parts !== "Not Available" && parts
  );
  return addressArray.join(", ");
};

function App() {
  const {
    setData,
    setSelectedIndex,
    setLocations,
    selectedLocation
  } = React.useContext(AppContext);
  const { isGeolocationAvailable, coords } = useContext(GeoContext);
  // const [fetchingData, setFetchingData] = useState(false);
  const resultsMode = "closest"

  useEffect(() => {
    // setSelectedIndex(null);
    // setFetchingData(true);

    let url = `.netlify/functions/providers?location=${selectedLocation}`;

    if (isGeolocationAvailable) {
      if (coords && resultsMode === "closest") {
        url = `${url}&coords=${coords.latitude},${coords.longitude}`;
      }
    }

    fetch(url)
      .then((response) => response.json())
      .then(async (data) => {
        // setFetchingData(false);
        const [first, ...results] = data;
        setData([first, ...results]);

        const locationSet = new Set();
        data.forEach((provider) => {
          console.log(provider);
          locationSet.add(provider["provider town/city"]);
        });
        setLocations(["All", ...locationSet]);
      });
  }, [coords, isGeolocationAvailable, selectedLocation, setData, setLocations, setSelectedIndex]);

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <title>#FreeSchoolMeals - No child should go hungry</title>
      </Helmet>
      <ListViewWrapper>
        <ListViewContainer>
          <NavSection />
          <Router history={history}>
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
        <Footer />
      </ListViewWrapper>
    </>
  );
}

export default App;

const ListViewWrapper = styled.div`
  padding-left: 70px;
  padding-right: 70px;
`;

const ListViewContainer = styled.div`
  display: grid;
  grid-gap: 130px;
  grid-template-columns: 200px 1fr;
`;
