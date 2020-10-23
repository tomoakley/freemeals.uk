import React, { useEffect, useState } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import fetch from "node-fetch";
import styled from "styled-components";

import "./App.css";

const Container = styled.div`
  display: flex;
  padding: 10px;
  position: relative;
`;

const Header = styled.div`
  padding: 10px;
`;

const Heading = styled.h1``;


const Option = styled.h3`
  display: inline;
  padding: 10px;
  border-bottom: solid black 1px;
  cursor: pointer;
  &:hover {
    background: blue;
    color: white;
  }
  ${(props) =>
    props.isSelected &&
    `
    background: blue;
    color: white;
  `}
`;


const LocationFilter = styled.div`
  flex: 1;
  list-style: none;
  margin: 0;
`;

const LocationItem = styled.li`
  margin: 5px;
`;

const LocationLink = styled.a`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  flex: 2;
  height: 100%;
  overflow-y: scroll;
`;

const Provider = styled.li`
  display: block;
  padding: 10px;
  border-bottom: solid black 1px;
  cursor: pointer;
  &:hover {
    background: blue;
    color: white;
  }
  ${(props) =>
    props.isSelected &&
    `
    background: blue;
    color: white;
  `}
`;

const Block = styled.span`
  display: block;
`;

const SelectedPane = styled.div`
  flex: 2;
  margin-left: 20px;
  background: white;
  height: 100vh;
  padding: 10px;
  @media screen and (min-width: 600px) {
    display: block;
  }
  @media screen and (max-width: 600px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 75%;
    z-index: 1000;
  }
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

function App() {
  const [mode, setMode] = useState("list");
  const [data, setData] = useState([]);

  const [markers,setMarkers] = useState();

  const [locations, setLocations] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("All");

  const NAME = "provider name";
  const URL = "provider url";
  const OFFERS = "offer description";
  const INSTRUCTIONS = "how to claim";


  useEffect(() => {
    fetch(`.netlify/functions/providers?location=${selectedLocation}`)
      .then((response) => response.json())
      .then(async (data) => {
        // eslint-disable-next-line no-unused-vars
        const [first, ...results] = data;
        setData(selectedLocation === "All" ? results : [first, ...results]);
        console.log(data);
        const locationSet = new Set();

        if (!locations.length) {
          data.forEach((provider) => {
            locationSet.add(provider["provider town/city"]);
          });
          setLocations(["All", ...locationSet]);
          console.log(locationSet);
        }
      });
  }, [selectedLocation, locations.length]);

  useEffect(()=>{
    initMarkers();
  })

  const initMarkers = async () => {
    const customIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
      iconSize: [35, 46],
      iconAnchor: [17, 46],
    });

     if(data.length)
      setMarkers(data.map((provider, i)=>{

        if(!provider.latitude){
          provider.latitude = 56 - (i*0.05);
          provider.longitude = -5 + (i*0.05);
        }

        let position = [provider.latitude,provider.longitude];
        
        return (
              <Marker
                key={i}
                position={position}
                icon={customIcon}
              >
                <Popup>
                  <Block>{provider["provider name"]}</Block>
                  <Block>{provider["provider address 1"]}</Block>
                  <Block>{provider["provider url"]}</Block>
                </Popup>
              </Marker>
            )
          }
        )
      )
  }

  const handleProviderClick = (i) => {
    setSelectedIndex(i);
  };

  const handleLocationClick = (e, location) => {
    e.preventDefault();
    setSelectedLocation(location);
  };

  const buildAddressString = (provider) => {
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

  return (
    <>
      <Header>
        <Heading>Freemeals.uk</Heading>
        <span>
          A collated list of venues offering free meals to UK school children
          during the half terms holidays
        </span>
      </Header>
      <div className="mode-select">
        <Option isSelected={mode==="list"}
        onClick={()=>setMode("list")}  
        >List</Option>
        <Option isSelected={mode==="map"}
        onClick={()=>setMode("map")}        
        >Map</Option>
      </div>
      {
        mode==="list"?
      <Container>
        <LocationFilter>
          <strong>Filter by location</strong>
          {locations.length &&
            locations.sort().map((location) => (
              <LocationItem>
                <Block
                  as={LocationLink}
                  href="#"
                  onClick={(e) => handleLocationClick(e, location)}
                >
                  {location === selectedLocation && <span>&#10003;</span>}
                  {location}
                </Block>
              </LocationItem>
            ))}
        </LocationFilter>
        <List>
          <li>{data.length} results</li>
          {data.length ? (
            data.map((provider, i) => (
              <Provider
                key={i}
                onClick={() => handleProviderClick(i)}
                isSelected={selectedIndex === i}
              >
                <h3>{provider[NAME]}</h3>
                <Block>{buildAddressString(provider)}</Block>
                <Block>{provider[URL]}</Block>
              </Provider>
            ))
          ) : (
            <span>Getting list of fantastic providers...</span>
          )}
        </List>
        {data.length && selectedIndex != null ? (
          <>
            <SelectedPane>
              <small>
                <button onClick={() => setSelectedIndex(null)}>Close</button>
              </small>
              <h2>{data[selectedIndex][NAME]}</h2>
              <Block>
                <strong>Description</strong>:{" "}
                {data[selectedIndex][OFFERS] || "???"}
              </Block>
              <Block>
                How to claim: {data[selectedIndex][INSTRUCTIONS] || "???"}
              </Block>
              <Block>
                <strong>Website</strong>:{" "}
                <a href={data[selectedIndex][URL]}>
                  {data[selectedIndex][URL] || "???"}
                </a>
              </Block>
              <Block>
                <strong>Location</strong>:{" "}
                <a
                  href={`https://www.google.co.uk/maps/place/${buildAddressString(
                    data[selectedIndex]
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {buildAddressString(data[selectedIndex])}
                </a>
              </Block>
            </SelectedPane>
          </>
        ) : null}
      </Container>
        :
        <div style={{display: "block", height:"100%"}}>
        <Map center={[53.937, -3.274]} 
            zoom={6}
            className="leaflet-map"
        >
          <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          {markers}
        </Map>
        </div>
      }
      {selectedIndex != null && <Overlay />}
    </>
  );
}

export default App;
