import React from 'react';
import styled from 'styled-components';

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
      <Logo src="/icons/react.svg" alt="React Logo" />
    </LogoContainer>
  );
};

export default ReactApp;
