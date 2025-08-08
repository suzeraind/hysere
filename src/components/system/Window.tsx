import React from 'react';
import styled from 'styled-components';
import { Rnd } from 'react-rnd';
import useWindowsStore from '../../store/useWindowsStore';
import type { WindowInstance } from '../../types';

interface WindowProps {
  window: WindowInstance;
}

const WindowContainer = styled.div`
  background: var(--secondary-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TitleBar = styled.div`
  height: 36px;
  background: var(--primary-bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  cursor: move;
  flex-shrink: 0;
  border-bottom: 1px solid var(--border-color);
`;

const Title = styled.span`
  font-weight: 500;
  font-size: 14px;
`;

const CloseButton = styled.button`
  background: #ff5f56;
  border: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b0000;
  font-size: 8px;
  line-height: 0;

  &:hover {
    background: #e0443e;
  }
`;

const Content = styled.div`
  padding: 16px;
  flex-grow: 1;
  overflow: auto;
  background: var(--secondary-bg);
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
          <Title>{window.app.title}</Title>
          <CloseButton onClick={() => closeWindow(window.id)} />
        </TitleBar>
        <Content>
          <AppContent />
        </Content>
      </WindowContainer>
    </Rnd>
  );
};

export default Window;