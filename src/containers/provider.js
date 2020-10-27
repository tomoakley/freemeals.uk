import React, { useEffect } from "react";
import styled from "styled-components";

import { AppContext } from "components/AppContext/AppContext";

import ProviderSection from "components/ProviderSection";
import SelectedPane from "components/SelectedPane";

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
      <ProviderSection />
      {selectedIndex != null ? (
        <SelectedPane
        // markers={markers}
        />
      ) : null}
    </ProviderContainer>
  );
};

export default Provider;

const ProviderContainer = styled.div`
  height: 100vh;
  display: grid;
  /* grid-gap: 130px; */
  grid-template-columns: 420px 1fr;
  @media screen and (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
    width: 100%;
  }
`;
