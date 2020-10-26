import React from 'react';
import styled from 'styled-components';

function Button({ externalLink = null, onClick = null, text }) {
  return externalLink ? (
    <SCButton target='_blank' rel='noopener noreferrer' href={externalLink}>
      {text}
    </SCButton>
  ) : (
    <SCButton as={'button'} onClick={onClick}>
      {text}
    </SCButton>
  );
}

const SCButton = styled.a`
  background: #000;
  border: 0;
  box-shadow: none;
  color: #fff;
  font-weight: 700;
  padding: 10px 20px;
  text-transform: uppercase;
  max-width: 240px;
  flex-shrink: 0;

  &:hover {
    color: #f2c867;
    text-decoration: none;
  }
`;

export default Button;
