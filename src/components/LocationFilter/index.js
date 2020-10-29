import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../AppContext/AppContext";
import IconSelected from "../../images/icon-selected.svg";
import { BREAKPOINTS } from "../../constants";
import { useHistory } from "react-router-dom";

function LocationFilter() {
  const history = useHistory();
  const {
    data,
    locations,
    setSelectedLocation,
    selectedLocation,
    setFilteredData,
    setSelectedIndex,
  } = useContext(AppContext);

  const filterDataByLocation = (location) => {
    return data.filter((provider) => provider["provider town/city"] === location)
  }

  const handleLocationClick = (e, location) => {
    history.push(`/`);
    e.preventDefault();
    setSelectedLocation(location);
    setSelectedIndex(null)
    if (location === "All") {
      setFilteredData(null)
    } else {
      const filteredData = filterDataByLocation(location);
      setFilteredData(filteredData);
    }
  };

  return (
    <Container>
      <strong>Choose location</strong>
      <LocationFilterContainer>
        {!!locations?.length &&
          locations.map((location) => (
              <LocationItem key={location}>
                <Block
                  href="#"
                  onClick={(e) => handleLocationClick(e, location)}
                >
                  {selectedLocation === location && (
                    <SelectedItemIcon
                      src={IconSelected}
                      alt={`Selected location: ${selectedLocation}}`}
                    />
                  )}
                  {location}
                </Block>
              </LocationItem>
            ))}
      </LocationFilterContainer>
    </Container>
  );
}

const Block = styled.a`
  display: block;
  padding: 1px 0;
  color: #f5f5f5;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: rgb(242,200,103);
  }
  ${({ isSelected }) =>
    isSelected &&
    `
    font-weight: bold;
  `}
`;

const Container = styled.div`
  display: none;
  @media screen and (min-width: ${BREAKPOINTS.md}) {
    display: block;
    margin-top: 10px;
  }
`

const LocationFilterContainer = styled.ul`
  flex: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  height: calc(100vh - 480px);
`;

const LocationItem = styled.li`
  margin: 2px;
`;

const SelectedItemIcon = styled.img`
  margin-right: 5px;
`;

export default LocationFilter;
