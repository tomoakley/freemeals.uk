import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { BREAKPOINTS } from "../../constants";
import Banner from "images/banner.svg";
import Header from "images/header.svg";
import PostcodeSearch from "../PostcodeSearch/index";
import LocationFilter from "components/LocationFilter";

const NavSectionContainer = styled.div`
  width: 100%;
  > a,
  > img {
    display: block;
    margin: 0 auto 10px;
    max-width: 100%;
  }
  .header {
    display: block;
    width: 100%;
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

const NavSection = ({ setSelectedIndex }) => {
  return (
    <NavSectionContainer>
      <Link to="/" onClick={() => setSelectedIndex(null)}>
        <img className="header" src={Header} alt={"Free School Meals"} />
        <img
          className="banner"
          src={Banner}
          alt={
            "Venues offering free meals to UK school children during half-term holidays. Because no child should go hungry."
          }
        />
      </Link>
      <div className="filters">
        <PostcodeSearch />
        <LocationFilter />
      </div>
    </NavSectionContainer>
  );
};

export default NavSection;
