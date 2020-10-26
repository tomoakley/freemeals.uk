import React from "react";
import styled from "styled-components";

import FooterLogo from "images/footer.svg";
import { BREAKPOINTS, GOOGLE_DOC_LINK } from "../../constants";
import { ReactComponent as IconClose } from "images/icon-close.svg";
import Button from "components/Button";

function ContributingFooter({ setFooterVisible }) {
  return (
    <ContributingFooterContainer>
      <img src={FooterLogo} alt={"#FREESCHOOLMEALS"} />
      <p>
        <span role="img" aria-label="Wave" style={{ marginRight: 10 }}>
          👋
        </span>{" "}
        Hi there! If you'd like to contribute, head over to the{" "}
        <a href="https://github.com/tomoakley/freemeals.uk">Github repo</a> or
        the{" "}
        <a href="https://docs.google.com/spreadsheets/d/1OaRn7UHsFpFLOfTeiUnIBr7ofjcemBEvf_gl5b1PoTY/edit#gid=593288514">
          Google Sheet
        </a>
        . Thanks!
      </p>{" "}
      <Button externalLink={GOOGLE_DOC_LINK} text={'Add your venue'} />
      <CloseButton onClick={() => setFooterVisible(false)}>
        <IconClose />
      </CloseButton>
    </ContributingFooterContainer>
  );
}

const ContributingFooterContainer = styled.div`
  display: none;
  background: #ba0d37;
  color: #fff;
  padding: 20px;
  z-index: 10;
  margin-bottom: 20px;
  @media screen and (min-width: ${BREAKPOINTS.md}) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  @media screen and (min-width: ${BREAKPOINTS.xl}) {
    position: sticky;
    bottom: 25px;
  }
  img {
    margin-bottom: 10px;
    object-fit: contain;
    @media screen and (min-width: ${BREAKPOINTS.md}) {
      margin-bottom: 0;
      margin-right: 15px;
    }
  }

  p {
    font-size: 14px;
    margin: 0 0 10px;
    @media screen and (min-width: ${BREAKPOINTS.md}) {
      margin-bottom: 0;
      margin-right: 15px;
    }
    a {
      color: #fff;
    }
  }
`;

const CloseButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  appearance: none;
  transition: all 0.2s ease;
  width: 24px;
  height: 24px;
  padding: 0;
  > svg > g {
    stroke: white;
  }
  &:hover {
    > svg > g {
      stroke: #f2c867;
    }
  }
`;

export default ContributingFooter;
