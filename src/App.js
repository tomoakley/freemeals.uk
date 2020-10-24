import React, { useEffect, useState } from "react";
import L from "leaflet";
import { Marker } from "react-leaflet";
import fetch from "node-fetch";
import styled from "styled-components";

import ContributingFooter from "./components/ContributingFooter";
import Header from "./components/Header";
import LocationFilter from "./components/LocationFilter";
import Overlay from "./components/Overlay";
import PostcodeSearch from "./components/PostcodeSearch";
import ProviderList from "./components/ProviderList";
import ProviderMap from "./components/ProviderMap";
import SelectedPane from "./components/SelectedPane";

import "./App.css";

const Container = styled.div`
  display: flex;
  padding: 10px;
  position: relative;
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
        <div>
          {mode === "map" && <PostcodeSearch setMapProps={setMapProps} />}
          <LocationFilter
            locations={locations}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
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
        <ContributingFooter setFooterVisible={setFooterVisible} />
      )}
    </>
  );
}

export default App;
