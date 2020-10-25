import React from "react";
import styled from "styled-components";
import Block from "../Block";
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
      <strong>Filter by location</strong>
      {!!locations?.length &&
        locations.sort().slice().map((location) => (
          <LocationItem key={location}>
            <Block
              as={LocationLink}
              href="#"
              onClick={(e) => handleLocationClick(e, location)}
            >
              {location}
            </Block>
          </LocationItem>
        ))}
    </LocationFilterContainer>
  );
}

const LocationFilterContainer = styled.div`
  flex: 1;
  list-style: none;
  margin: 0;
  overflow-y: scroll;
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

export default LocationFilter;
