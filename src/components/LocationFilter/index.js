import React from "react";
import styled from "styled-components";
import Block from "../Block";

const LocationFilterContainer = styled.div`
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

function LocationFilter({ locations, selectedLocation, setSelectedLocation }) {
  const handleLocationClick = (e, location) => {
    e.preventDefault();
    setSelectedLocation(location);
  };

  return (
    <LocationFilterContainer>
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
    </LocationFilterContainer>
  );
}

export default LocationFilter;
