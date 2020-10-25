import React, { useEffect } from "react";
import styled from "styled-components";

import { AppContext } from "components/AppContext/AppContext";

import ProviderSection from "components/ProviderSection";
import SelectedPane from "components/SelectedPane";

const Provider = ({ match }) => {
  const { setSelectedIndex } = React.useContext(AppContext);
  const selectedIndex = match.params.id;

  useEffect(() => {
    setSelectedIndex(selectedIndex);
  }, [setSelectedIndex, selectedIndex]);

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
  display: grid;
  grid-gap: 130px;
  grid-template-columns: 420px 1fr;
`;
