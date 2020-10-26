import React from 'react';
import styled from 'styled-components';

const Spinner = () => (
  <SpinnerContainer>
    <StyledSpinner viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
      />
    </StyledSpinner>
  </SpinnerContainer>
);

const SpinnerContainer = styled.div`
  width: 400px;
  height: 200px;
  display: inline-flex;
`;

const StyledSpinner = styled.svg`
  margin: auto;
  align-self: center;
  animation: rotate 2s linear infinite;
  margin: auto;
  width: 50px;
  height: 50px;
  
  & .path {
    stroke: #BB0E37;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default Spinner