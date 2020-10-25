import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Button({ externalLink = null, to = null, text }) {
  //
  return externalLink ? (
    <SCButton target='_blank' rel='noopener noreferrer' href={externalLink}>
      {text}
    </SCButton>
  ) : (
    <SCButton as={Link} to={to}>
      {text}
    </SCButton>
  );
}

const SCButton = styled.a`
  background: #85de77;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s ease;
  align-self: flex-start;
  &:hover {
    background: #65de77;
    transform: scale(1.05);
  }
`;

export default Button;
