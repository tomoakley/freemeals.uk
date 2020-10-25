import React from "react";
import styled from "styled-components";

import Banner from "images/banner.svg";

const NavSectionContainer = styled.div`
  /* display: none; */
  width: 100%;
  @media screen and (min-width: 768px) {
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
