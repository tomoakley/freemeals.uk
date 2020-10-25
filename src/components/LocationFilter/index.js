import React from "react";
import styled from "styled-components";
import { AppContext } from "../AppContext/AppContext";

function LocationFilter() {
  const { locations, setSelectedLocation, selectedLocation } = React.useContext(AppContext);

  const handleLocationClick = (e, location) => {
    e.preventDefault();
    setSelectedLocation(location);
    console.log(selectedLocation);
  };

  return (
    <LocationFilterContainer>
      <strong>Choose location</strong>
      {!!locations?.length &&
        locations.sort().slice().map((location) => (
          <LocationItem key={location}>
            <Block
              onClick={(e) => handleLocationClick(e, location)}
            >
              {location}
            </Block>
          </LocationItem>
        ))}
    </LocationFilterContainer>
  );
}

const Block = styled.span`
  display: block;
  padding: 1px 0;
  color: #F5F5F5;
  text-decoration: none;
  &:hover {
    color: #FFFFFF;
  }
`;

const LocationFilterContainer = styled.div`
  flex: 1;
  list-style: none;
  margin: 0;
  overflow-y: scroll;
`;

const LocationItem = styled.li`
  margin: 2px;
`;

export default LocationFilter;
