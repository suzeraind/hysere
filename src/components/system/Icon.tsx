import React from 'react';
import styled from 'styled-components';
import { type App } from '../../types';

interface IconProps {
  app: App;
  onDoubleClick: (app: App) => void;
}

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  margin: 10px;
  cursor: pointer;
  text-align: center;
  padding: 5px;
  border-radius: 5px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const IconImage = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: 5px;
`;

const IconLabel = styled.span`
  color: #fff;
  font-size: 12px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
`;

const Icon: React.FC<IconProps> = ({ app, onDoubleClick }) => {
  return (
    <IconContainer onDoubleClick={() => onDoubleClick(app)}>
      <IconImage src={app.icon} alt={app.title} />
      <IconLabel>{app.title}</IconLabel>
    </IconContainer>
  );
};

export default Icon;
