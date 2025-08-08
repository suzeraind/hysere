import React from 'react';
import styled from 'styled-components';
import { type App } from '../../types';

interface IconProps {
  app: App;
  onDoubleClick: () => void;
}

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  margin: 10px;
  cursor: pointer;
  text-align: center;
  color: white;
  
  img {
    width: 48px;
    height: 48px;
  }

  span {
    margin-top: 5px;
    text-shadow: 1px 1px 2px black;
  }
`;

const Icon: React.FC<IconProps> = ({ app, onDoubleClick }) => {
  return (
    <IconContainer onDoubleClick={onDoubleClick}>
      <img src={app.icon} alt={app.title} />
      <span>{app.title}</span>
    </IconContainer>
  );
};

export default Icon;