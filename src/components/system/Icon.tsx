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
  width: 90px;
  margin: 10px;
  padding: 8px;
  cursor: pointer;
  text-align: center;
  color: var(--text-color);
  border-radius: 5px;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  img {
    width: 48px;
    height: 48px;
    margin-bottom: 8px;
  }

  span {
    font-size: 13px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    word-break: break-word;
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