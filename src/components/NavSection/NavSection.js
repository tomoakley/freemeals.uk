import React from "react";
import styled from "styled-components";

import Banner from "images/banner.svg";
import { BREAKPOINTS } from "../../constants";

const NavSectionContainer = styled.div`
  width: 100%;
  @media screen and (min-width: ${BREAKPOINTS.md}) {
    display: block;
  }
`;

const NavSection = () => {
  return (
    <NavSectionContainer>
      <img src={Banner} alt={"FREE SCHOOL MEALS"} />
      <p>postcode related stuff goes here</p>
    </NavSectionContainer>
  );
};

export default NavSection;
