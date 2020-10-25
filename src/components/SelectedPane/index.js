import React from "react";
import { Map, TileLayer } from "react-leaflet";
import styled from "styled-components";

import { AppContext } from "components/AppContext/AppContext";

import { buildAddressString } from "containers/list";
import Block from "../Block";

import {
  CLOSE_TIME,
  INSTRUCTIONS,
  MARCUS_SOURCE_URL,
  NAME,
  OFFERS,
  OFFER_DAYS,
  OPEN_TIME,
  PROVIDER_SOURCE_URL,
  URL,
} from "../../constants";

function SelectedPane() {
  const { data, selectedIndex, setSelectedIndex } = React.useContext(
    AppContext
  );

  const mode = "list";
  return (
    <SelectedPaneContainer isMapMode={mode === "map"}>
      <small>
        <CloseButton onClick={() => setSelectedIndex(null)}>Close</CloseButton>
      </small>
      {/* <div style={{ height: "50%", width: "100%" }}>
        {[
          data[selectedIndex]["latitude"] && data[selectedIndex]["longitude"],
        ] ? (
          <Map
            center={[
              data[selectedIndex]["latitude"],
              data[selectedIndex]["longitude"],
            ]}
            zoom={20}
            className="leaflet-map"
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers}
          </Map>
        ) : null}
      </div> */}
      <h2>{data[selectedIndex][NAME]}</h2>
      <Block>
        <strong>Description</strong>: {data[selectedIndex][OFFERS] || "???"}
      </Block>
      <Block>
        <strong>Availability</strong>:
      </Block>
      <ul style={{ margin: 0 }}>
        <li>
          Times: {data[selectedIndex][OPEN_TIME] || "Not specified"} -{" "}
          {data[selectedIndex][CLOSE_TIME] || "Not specified"}
        </li>
        <li>Days: {data[selectedIndex][OFFER_DAYS] || "Not specified"}</li>
      </ul>
      <Block>
        <strong>How to claim</strong>:{" "}
        {data[selectedIndex][INSTRUCTIONS] || "???"}
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
      <Block>
        <strong>Source</strong>:{" "}
        <a href={data[selectedIndex][MARCUS_SOURCE_URL]}>
          {data[selectedIndex][MARCUS_SOURCE_URL]}
        </a>
        ,{" "}
        <a href={data[selectedIndex][PROVIDER_SOURCE_URL]}>
          {data[selectedIndex][PROVIDER_SOURCE_URL]}
        </a>
      </Block>
    </SelectedPaneContainer>
  );
}

const SelectedPaneContainer = styled.div`
  flex: 2;
  min-width: 50%;
  margin-left: 20px;
  background: white;
  height: 100vh;
  padding: 10px;
  overflow-y: scroll;
  @media screen and (min-width: 600px) {
    display: block;
    max-width: 50%;
  }
  @media screen and (max-width: 600px) {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
    width: 75%;
  }
  ${(props) =>
    props.isMapMode &&
    `
    position: absolute;
    top: 0;
    right: 0;
    z-index: 500;
  `}
`;

const CloseButton = styled.button`
  cursor: pointer;
  background: #85de77;
  color: white;
  appearance: none;
  border: none;
  padding: 5px;
  border-radius: 20px;
  &:hover {
    background: #65de77;
  }
`;

export default SelectedPane;
