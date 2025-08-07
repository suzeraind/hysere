import React from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';
import { type WindowInstance } from '../../types';

interface WindowProps {
  window: WindowInstance;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  updateWindowState: (id: string, updates: Partial<WindowInstance>) => void;
  isFocused: boolean;
}

const WindowContainer = styled.div<{ isFocused: boolean; }>`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ isFocused }) => (isFocused ? '#fff' : '#666')};
  border-radius: 5px;
  background-color: #444;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const TitleBar = styled.div`
  height: 30px;
  background-color: #555;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: move;
  color: #fff;
  border-bottom: 1px solid #666;
`;

const Title = styled.span`
  font-weight: bold;
`;

const Controls = styled.div`
  display: flex;
  gap: 5px;
`;

const ControlButton = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
`;

const CloseButton = styled(ControlButton)`
  background-color: #ff5f56;
`;

const MinimizeButton = styled(ControlButton)`
  background-color: #ffbd2e;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow: auto;
`;

const Window: React.FC<WindowProps> = ({ window, onClose, onMinimize, onFocus, updateWindowState, isFocused }) => {
  const { id, app, x, y, width, height, zIndex, isMinimized } = window;

  if (isMinimized) {
    return null;
  }

  return (
    <Rnd
      size={{ width, height }}
      position={{ x, y }}
      onDragStart={() => onFocus(id)}
      onDragStop={(_e, d) => updateWindowState(id, { x: d.x, y: d.y })}
      onResizeStart={() => onFocus(id)}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        updateWindowState(id, {
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
          ...position,
        });
      }}
      minWidth={200}
      minHeight={150}
      style={{ zIndex }}
      bounds="parent"
    >
      <WindowContainer isFocused={isFocused} onMouseDown={() => onFocus(id)}>
        <TitleBar>
          <Title>{app.title}</Title>
          <Controls>
            <MinimizeButton onClick={() => onMinimize(id)} />
            <CloseButton onClick={() => onClose(id)} />
          </Controls>
        </TitleBar>
        <Content>
          <app.component />
        </Content>
      </WindowContainer>
    </Rnd>
  );
};

export default Window;
