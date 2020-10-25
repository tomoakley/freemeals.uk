import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GeoContext } from "../GeoProvider";
import { GOOGLE_DOC_LINK, RESULTS_MODE } from '../../constants';
import Button from "components/Button";

function Header({ resultsMode, setResultsMode }) {
  const { isGeolocationEnabled } = useContext(GeoContext);
  const location = useLocation();

  return (
    <HeaderContainer>
      <div>
        <Heading>#FreeSchoolMeals information</Heading>
        <Button text={'Add your listing'} externalLink={GOOGLE_DOC_LINK} />
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
        <ModeSelect>
          <Option
            isSelected={resultsMode === RESULTS_MODE.closest}
            onClick={() => setResultsMode(RESULTS_MODE.closest)}
            disabled={!isGeolocationEnabled}
          >
            Show results closest to me
          </Option>
          <Option
            isSelected={resultsMode === RESULTS_MODE.all}
            onClick={() => setResultsMode(RESULTS_MODE.all)}
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
