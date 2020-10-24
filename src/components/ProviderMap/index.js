import React from "react";
import { Map, TileLayer } from "react-leaflet";
import styled from "styled-components";

const MapContainer = styled.div`
  position: relative;
  flex: 3;
  height: 100vh;

  > div:first-child {
    bottom: 0;
    display: block;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
  }
`;

function ProviderMap({ mapProps, markers }) {
  return (
    <MapContainer>
      <div>
        <Map
          center={mapProps.coords}
          zoom={mapProps.zoom}
          className="leaflet-map"
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers}
        </Map>
      </div>
    </MapContainer>
  );
}

export default ProviderMap;
