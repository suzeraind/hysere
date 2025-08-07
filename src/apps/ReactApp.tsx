import React from 'react';
import styled from 'styled-components';
import reactLogo from '../assets/icons/react.svg';

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
`;

const ReactApp: React.FC = () => {
  return (
    <LogoContainer>
      <Logo src={reactLogo} alt="React Logo" />
    </LogoContainer>
  );
};

export default ReactApp;
