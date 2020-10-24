import React, { useEffect, useState } from "react";
import L from "leaflet";
import { Marker } from "react-leaflet";
import fetch from "node-fetch";
import styled from "styled-components";

import Header from "./components/Header";
import LocationFilter from "./components/LocationFilter";
import ProviderList from "./components/ProviderList";
import ProviderMap from "./components/ProviderMap";
import SelectedPane from "./components/SelectedPane";

import "./App.css";

const Container = styled.div`
  display: flex;
  padding: 10px;
  position: relative;
`;

const Overlay = styled.div`
  @media screen and (min-width: 600px) {
    display: none;
  }
  background: black;
  opacity: 0.5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const ContributingFooter = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  position: fixed;
  z-index: 999;
  width: 100%;
  bottom: 0;
  padding: 10px;
  background: #aaa;
  color: white;
  font-weight: bold;
  a {
    color: white;
  }
  button {
    appearance: none;
    background: white;
    color: #aaa;
    border: white;
  }
`;

const DEFAULT_UK_MAP_PROPS = { coords: [55.378052, -3.435973], zoom: 6 };

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
  const [mode, setMode] = useState("list");
  const [data, setData] = useState([]);

  const [markers, setMarkers] = useState();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [mapProps, setMapProps] = useState(DEFAULT_UK_MAP_PROPS);
  const [footerVisible, setFooterVisible] = useState(true);

  useEffect(() => {
    setSelectedIndex(null);
    fetch(`.netlify/functions/providers?location=${selectedLocation}`)
      .then((response) => response.json())
      .then(async (data) => {
        // eslint-disable-next-line no-unused-vars
        const [first, ...results] = data;
        setData(selectedLocation === "All" ? results : [first, ...results]);
        setMapProps(
          selectedLocation === "All"
            ? DEFAULT_UK_MAP_PROPS
            : { coords: [first["latitude"], first["longitude"]], zoom: 12 }
        );
        console.log(data);

        if (!locations.length) {
          const locationSet = new Set();
          data.forEach((provider) => {
            locationSet.add(provider["provider town/city"]);
          });
          setLocations(["All", ...locationSet]);
          console.log(locationSet);
        }
      });
  }, [selectedLocation, locations.length]);

  useEffect(() => {
    (async () => {
      const customIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
        iconSize: [35, 46],
        iconAnchor: [17, 46],
      });

      if (data.length) {
        setMarkers(
          data.map((provider, i) => {
            if (!provider.latitude) {
              provider.latitude = 56 - i * 0.05;
              provider.longitude = -5 + i * 0.05;
            }

            let position = [provider.latitude, provider.longitude];

            return (
              <Marker
                key={i}
                position={position}
                icon={customIcon}
                onClick={() => handleProviderClick(i)}
              />
            );
          })
        );
      }
    })();
  }, [data, mode]);

  const handleProviderClick = (i) => {
    setSelectedIndex(i);
  };

  const handleModeChange = (mode) => {
    setMode(mode);
    setSelectedIndex(null);
  };

  return (
    <>
      <Header handleModeChange={handleModeChange} mode={mode} />
      <Container>
        <LocationFilter
          locations={locations}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        {mode === "list" ? (
          <ProviderList
            buildAddressString={buildAddressString}
            data={data}
            handleProviderClick={handleProviderClick}
            selectedIndex={selectedIndex}
          />
        ) : (
          <ProviderMap mapProps={mapProps} markers={markers} />
        )}
        {data.length && selectedIndex != null ? (
          <SelectedPane
            data={data}
            markers={markers}
            mode={mode}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        ) : null}
      </Container>
      {selectedIndex != null && <Overlay />}
      {footerVisible && (
        <ContributingFooter>
          <span>
            <span role="img" aria-label="Wave">
              👋
            </span>{" "}
            Hi there! If you'd like to contribute, head over to the{" "}
            <a href="https://github.com/tomoakley/freemeals.uk">Github repo</a>{" "}
            or the{" "}
            <a href="https://docs.google.com/spreadsheets/d/1OaRn7UHsFpFLOfTeiUnIBr7ofjcemBEvf_gl5b1PoTY/edit#gid=593288514">
              Google Sheet
            </a>
            . Thanks!
          </span>{" "}
          <button onClick={() => setFooterVisible(false)}>Hide</button>
        </ContributingFooter>
      )}
    </>
  );
}

export default App;
