import React, { useEffect } from "react";
import styled from "styled-components";

import { AppContext } from "components/AppContext/AppContext";

import ProviderSection from "components/ProviderSection";
import SelectedPane from "components/SelectedPane";

import { BREAKPOINTS } from "../constants"

const Provider = ({ match }) => {
  const { setSelectedIndex } = React.useContext(AppContext);
  const selectedIndex = match.params.id;

  // setSelectedIndex isnt' a stable function so
  // including it in the deps will cause an infinite loop
  useEffect(() => {
    setSelectedIndex(selectedIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  return (
    <ProviderContainer>
      <ProviderSectionContainer>
        <ProviderSection />
      </ProviderSectionContainer>
      {selectedIndex != null ? (
        <SelectedPane
        // markers={markers}
        />
      ) : null}
    </ProviderContainer>
  );
};

export default Provider;

const ProviderSectionContainer = styled.div`
  display: none;
  @media screen and (min-width: ${BREAKPOINTS.xl}) {
    display: block;
  }
`;

const ProviderContainer = styled.div`
  background: #262626;
  height: 100%;
  display: grid;
  @media screen and (min-width: ${BREAKPOINTS.xl}) {
    /* grid-gap: 130px; */
    grid-template-columns: 420px 1fr;
  }
`;
