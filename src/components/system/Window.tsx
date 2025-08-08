import React from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import useWindowsStore from '../../store/useWindowsStore';
import type { WindowInstance } from '../../types';

interface WindowProps {
  window: WindowInstance;
}

const WindowContainer = styled.div`
  border: 1px solid #ccc;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TitleBar = styled.div`
  height: 30px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: move;
  flex-shrink: 0;
`;

const Content = styled.div`
  padding: 10px;
  flex-grow: 1;
  overflow: auto;
`;

const Window: React.FC<WindowProps> = ({ window }) => {
  const {
    closeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowsStore();

  const AppContent = window.app.component;

  return (
    <Rnd
      size={{ width: window.width, height: window.height }}
      position={{ x: window.x, y: window.y }}
      onDragStop={(_e, d) => {
        updateWindowPosition(window.id, d.x, d.y);
      }}
      onResizeStop={(_e, _direction, ref) => {
        updateWindowSize(window.id, parseInt(ref.style.width, 10), parseInt(ref.style.height, 10));
      }}
      onMouseDown={() => focusWindow(window.id)}
      style={{ zIndex: window.zIndex, display: window.isMinimized ? 'none' : 'block' }}
      minWidth={200}
      minHeight={150}
      dragHandleClassName="title-bar"
    >
      <WindowContainer>
        <TitleBar className="title-bar">
          <span>{window.app.title}</span>
          <button onClick={() => closeWindow(window.id)}>X</button>
        </TitleBar>
        <Content>
          <AppContent />
        </Content>
      </WindowContainer>
    </Rnd>
  );
};

export default Window;