import React from "react";
import styled from "styled-components";

import FooterLogo from "images/footer.svg";

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
      <button>Add your venue</button>
    </ContributingFooterContainer>
  );
}

const ContributingFooterContainer = styled.div`
  align-items: center;
  background: #ba0d37;
  bottom: 25px;
  color: #fff;
  height: 63px;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  position: fixed;
  width: calc(100% - 140px);
  z-index: 10;

  img {
    margin-left: 30px;
    object-fit: contain;
  }

  p {
    font-size: 14px;
    margin: 0;

    a {
      color: #fff;
    }
  }

  button {
    background: #000;
    border: 0;
    box-shadow: none;
    color: #fff;
    font-weight: 700;
    height: 40px;
    text-transform: uppercase;
    width: 200px;
  }
`;

export default ContributingFooter;
