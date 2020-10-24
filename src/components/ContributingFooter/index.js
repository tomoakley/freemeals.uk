import React from "react";
import styled from "styled-components";

function ContributingFooter({ setFooterVisible }) {
  return (
    <ContributingFooterContainer>
      <span>
        <span role="img" aria-label="Wave">
          👋
        </span>{" "}
        Hi there! If you'd like to contribute, head over to the{" "}
        <a href="https://github.com/tomoakley/freemeals.uk">Github repo</a> or
        the{" "}
        <a href="https://docs.google.com/spreadsheets/d/1OaRn7UHsFpFLOfTeiUnIBr7ofjcemBEvf_gl5b1PoTY/edit#gid=593288514">
          Google Sheet
        </a>
        . Thanks!
      </span>{" "}
      <button onClick={() => setFooterVisible(false)}>Hide</button>
    </ContributingFooterContainer>
  );
}

const ContributingFooterContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  position: fixed;
  z-index: 999;
  width: 100%;
  bottom: 0;
  padding: 10px;
  background: #aaa;
  color: white;
  font-weight: bold;
  a {
    color: white;
  }
  button {
    appearance: none;
    background: white;
    color: #aaa;
    border: white;
  }
`;

export default ContributingFooter;
