import React, { useEffect, useState } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker } from "react-leaflet";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { AppContext } from "components/AppContext/AppContext";

import { buildAddressString } from "containers/list";
import Block from "../Block";
import { ReactComponent as IconClose } from "images/icon-close.svg";

import {
  BREAKPOINTS,
  CLOSE_TIME,
  INSTRUCTIONS,
  NAME,
  OFFERS,
  OFFER_DAYS,
  OPEN_TIME,
  PROVIDER_SOURCE_URL,
  URL,
} from "../../constants";

function SelectedPane() {
  const history = useHistory();
  const { data, selectedIndex, setSelectedIndex, filteredData } = React.useContext(
    AppContext
  );
  const [selectedProvider, setSelectedProvider] = useState([]);

  useEffect(() => {
    if(!!data && selectedIndex != null) {
      const providerData = filteredData !== null ? filteredData : data;
      setSelectedProvider(providerData[selectedIndex]);
    }
  }, [selectedIndex, data, filteredData]);

  const mode = "list";

  const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
    iconSize: [35, 46],
    iconAnchor: [17, 46],
  });

  const handleCloseClick = () => {
    setSelectedIndex(null);
    history.push(`/`);
  };

  const buildAvailiblityString = (provider) => {
    const days = selectedProvider[OFFER_DAYS];
    const openTime = selectedProvider[OPEN_TIME];
    const closeTime = selectedProvider[CLOSE_TIME];

    return `${!!days ? `${days}: ` : ""}${!!openTime ? openTime : ""}${
      !!closeTime ? `- ${closeTime}` : ""
    }`;
  };

  const verifyUrl = (url) => {
    return url && url.startsWith("http");
  };

  return !data || selectedIndex == null ? null : (
    <SelectedPaneContainer isMapMode={mode === "map"}>
      <ProviderHeader>
        <HeaderTopRow>
          <ProviderName>{selectedProvider[NAME]}</ProviderName>
          <CloseButton onClick={handleCloseClick}>
            <IconClose />
          </CloseButton>
        </HeaderTopRow>
        <a
          href={`https://www.google.co.uk/maps/place/${buildAddressString(
            selectedProvider
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {buildAddressString(selectedProvider)}
        </a>
      </ProviderHeader>
      <div style={{ height: "50%", width: "100%" }}>
        {selectedProvider["latitude"] && selectedProvider["longitude"] ? (
          <Map
            center={[
              selectedProvider["latitude"],
              selectedProvider["longitude"],
            ]}
            zoom={20}
            className="leaflet-map"
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[selectedProvider.latitude, selectedProvider.longitude]}
              icon={customIcon}
            />
          </Map>
        ) : null}
      </div>
      {buildAvailiblityString(selectedProvider)}
      {selectedProvider[URL] && (
        <Block>
          <a href={selectedProvider[URL]}>{selectedProvider[URL]}</a>
        </Block>
      )}
      {selectedProvider[OFFERS] && (
        <Block>
          <SectionHeading>What's available?</SectionHeading>
          <span>{selectedProvider[OFFERS]}</span>
        </Block>
      )}
      {selectedProvider[INSTRUCTIONS] && (
        <Block>
          <SectionHeading>How to claim</SectionHeading>
          {selectedProvider[INSTRUCTIONS]}
        </Block>
      )}
      <small>
        {verifyUrl(selectedProvider[PROVIDER_SOURCE_URL]) ? (
          <>
            <strong>Source</strong>:{" "}
            <a href={selectedProvider[PROVIDER_SOURCE_URL]}>
              {selectedProvider[PROVIDER_SOURCE_URL]}
            </a>
          </>
        ) : null}
      </small>
    </SelectedPaneContainer>
  );
}

const SelectedPaneContainer = styled.div`
  background: #262626;
  height: 100%;
  padding: 10px 10px 20px;
  overflow-y: scroll;
  ${(props) =>
    props.isMapMode &&
    `
    position: absolute;
    top: 0;
    right: 0;
    z-index: 500;
  `}
  a {
    color: #ea1045;
    &:hover {
      color: rgb(242,200,103);
    }
  }
  @media screen and (max-width: ${BREAKPOINTS.md}) {
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
    width: 100%;
  }
  @media screen and (min-width: ${BREAKPOINTS.md}) {
    margin-left: 20px;
  }
`;

const CloseButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  appearance: none;
  transition: all 0.2s ease;
  width: 24px;
  height: 24px;
  padding: 0;
  &:hover {
    > svg > g {
      stroke: #f2c867;
    }
  }
`;

const ProviderHeader = styled.div`
  margin-bottom: 10px;
`;

const HeaderTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProviderName = styled.h2`
  margin-bottom: 0;
`;

const SectionHeading = styled.h3`
  margin: 0 0 15px;
`;

export default SelectedPane;
