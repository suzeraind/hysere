import React from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import { type App, type IconPosition } from '../../types';

interface IconProps {
  app: App;
  onDoubleClick: () => void;
  position: IconPosition;
  onDragStop: (id: string, x: number, y: number) => void;
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
  user-select: none; 
  -webkit-user-drag: none; 

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  img {
    width: 48px;
    height: 48px;
    margin-bottom: 8px;
    user-select: none;
    -webkit-user-drag: none;
  }

  span {
    font-size: 13px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    word-break: break-word;
  }
`;

const Icon: React.FC<IconProps> = ({ app, onDoubleClick, position, onDragStop }) => {
  return (
    <Rnd
      size={{ width: 90, height: 90 }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(_, d) => onDragStop(app.id, d.x, d.y)}
      enableResizing={false}
      bounds="parent"
    >
      <IconContainer onDoubleClick={onDoubleClick}>
        <img src={app.icon} alt={app.title} />
        <span>{app.title}</span>
      </IconContainer>
    </Rnd>
  );
};

export default Icon;