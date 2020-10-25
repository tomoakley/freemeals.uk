import React from "react";
import styled from "styled-components";

import { BREAKPOINTS } from "../../constants";
import Banner from "images/banner.svg";
import Header from "images/header.svg";

const NavSectionContainer = styled.div`
  width: 100%;
  img {
    display: block;
    margin: 0 auto 10px;
    max-width: 100%;
  }
  .header{
    display: block;
    @media screen and (min-width: ${BREAKPOINTS.md}) {
      display: none;
    }
  }
  .banner {
    display: none;
    @media screen and (min-width: ${BREAKPOINTS.md}) {
      display: block;
      margin-top: -15px;
    }
  }
`;

const NavSection = () => {
  return (
    <NavSectionContainer>
      <img className="header" src={Header} alt={"FREE SCHOOL MEALS"} />
      <img className="banner" src={Banner} alt={"FREE SCHOOL MEALS"} />
    </NavSectionContainer>
  );
};

export default NavSection;
