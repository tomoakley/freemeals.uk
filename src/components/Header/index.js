import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GeoContext } from "../GeoProvider";

function Header({ resultsMode, setResultsMode }) {
  const { isGeolocationEnabled } = useContext(GeoContext);
  const location = useLocation();

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
          <Option isSelected={location.pathname === "/"} to="/">
            List
          </Option>
          <Option isSelected={location.pathname === "/map"} to="/map">
            Map
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

const Option = styled(Link)`
  color: #000;
  padding: 10px;
  border-bottom: solid black 1px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: #85de77;
    color: #fff;
  }
  ${props =>
    props.isSelected &&
    `background: #85DE77;
    color: #fff;`}
`;

const SettingsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Header;
