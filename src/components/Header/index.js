import React, { useContext } from "react";
import styled from "styled-components";
import { GeoContext } from "../GeoProvider";

function Header({ handleModeChange, mode }) {
  const { isGeolocationEnabled } = useContext(GeoContext);

  return (
    <HeaderContainer>
      <div>
        <Heading>#FreeSchoolMeals information</Heading>
        <AddListingLink href="https://docs.google.com/forms/d/e/1FAIpQLSct2Y4Vl63EODdz-68EUj-ZpO2kVycnGsO_EOhx_Cb-aK1ojQ/viewform">
          Add your listing
        </AddListingLink>
      </div>
      <SubHeading>
        A collated list of venues offering free meals to UK school children
        during the half term holidays.
      </SubHeading>
      <SettingsContainer>
        <ModeSelect>
          <Option
            isSelected={mode === "list"}
            onClick={() => handleModeChange("list")}
          >
            List
          </Option>
          <Option
            isSelected={mode === "map"}
            onClick={() => handleModeChange("map")}
          >
            Map
          </Option>
        </ModeSelect>
        <ModeSelect>
          <Option
            isSelected={mode === "closest"}
            onClick={() => handleModeChange("closest")}
            disabled={!isGeolocationEnabled}
          >
            Show results closed to me
          </Option>
          <Option
            isSelected={mode === "all"}
            onClick={() => handleModeChange("all")}
          >
            Show all results
          </Option>
        </ModeSelect>
      </SettingsContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  padding: 10px;

  > div:first-child {
    display: flex;
    justify-content: space-between;
  }
`;

const Heading = styled.h1`
  margin: 0;
`;

const SubHeading = styled.span`
  font-size: 20px;
  display: block;
  padding: 10px 0;
`;

const AddListingLink = styled.a`
  background: #85de77;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s ease;
  align-self: flex-start;
  &:hover {
    background: #65de77;
  }
`;

const ModeSelect = styled.div`
  display: flex;
`;

const Option = styled.h3`
  padding: 10px;
  border-bottom: solid black 1px;
  cursor: pointer;
  &:hover {
    background: #85de77;
    color: white;
  }
  ${props =>
    props.isSelected &&
    `
    background: #85DE77;
    color: white;
  `}
`;

const SettingsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Header;
