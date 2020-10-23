import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import fetch from "node-fetch";
import styled from "styled-components";

import "./App.css";

const Container = styled.div`
  display: flex;
  padding: 10px;
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

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 50%;
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
  margin-left: 20px;
`;

function App() {
  const [mode, setMode] = useState("list");
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [markers, setMarkers] = useState();

  useEffect(() => {
    fetch(".netlify/functions/providers/")
      .then((response) => response.json())
      .then(async (data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  useEffect(()=>{
    initMarkers();
  },[data])

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

  const NAME = "provider name";
  const ADDRESS = "provider address";
  const URL = "provider url";
  const OFFERS = "half-term offers (26th - 30th october)";
  const CONTACT = "phone contact";

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
        <Option isSelected={mode=="list"}
        onClick={()=>setMode("list")}  
        >List</Option>
        <Option isSelected={mode=="map"}
        onClick={()=>setMode("map")}        
        >Map</Option>
      </div>
      {
        mode=="list"?
        <Container>
        <List>
          {data.length ?
            data.map((provider, i) => (
              <Provider
                key={i}
                onClick={() => handleProviderClick(i)}
                isSelected={selectedIndex === i}
              >
                <Block>{provider[NAME]}</Block>
                <Block>{provider[ADDRESS]}</Block>
                <Block>{provider[URL]}</Block>
              </Provider>
            )) : <span>Getting list of fantastic providers...</span>}
        </List>
        {data.length ? (
          <SelectedPane>
            <h2>{data[selectedIndex][NAME]}</h2>
            <Block>
              Half terms offers:{" "}
              {data[selectedIndex][OFFERS] || "Not specified"}
            </Block>
            <Block>Phone number: {data[selectedIndex][CONTACT]}</Block>
            <Block>
              Website:{" "}
              <a href={data[selectedIndex][URL]}>{data[selectedIndex][URL]}</a>
            </Block>
            <Block>
              Location:{" "}
              <a
                href={`https://www.google.co.uk/maps/place/${data[selectedIndex][ADDRESS]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data[selectedIndex][ADDRESS]}
              </a>
            </Block>
          </SelectedPane>
        ) : (
          <span>Loading</span>
        )}
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
    </>
  );
}

export default App;
