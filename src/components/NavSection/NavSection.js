import React from "react";
import Banner from "images/banner.svg";
import PostcodeSearch from "../PostcodeSearch/index"
import LocationFilter from "components/LocationFilter";


const NavSection = () => {

  return (
    <div>
      <img src={Banner} alt={"FREE SCHOOL MEALS"} />
      <PostcodeSearch></PostcodeSearch>
      <LocationFilter />
    </div>
  );
};

export default NavSection;
