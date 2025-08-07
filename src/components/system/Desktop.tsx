import React from 'react';
import styled from 'styled-components';
import { type App, type WindowInstance } from '../../types';
import Window from './Window';
import Icon from './Icon';

// Import app components
import Notepad from '../../apps/Notepad';
import About from '../../apps/About';
import ViteApp from '../../apps/ViteApp';
import ReactApp from '../../apps/ReactApp';
import reactLogo from '../../assets/icons/react.svg';

const DesktopContainer = styled.div`
  flex-grow: 1;
  position: relative;
  overflow: hidden;
  background: url('https://source.unsplash.com/random/1920x1080?nature') no-repeat center center fixed;
  background-size: cover;
`;

const IconGrid = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
`;

interface DesktopProps {
  windows: WindowInstance[];
  onOpenWindow: (app: App) => void;
  onCloseWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onFocusWindow: (id: string) => void;
  updateWindowState: (id: string, updates: Partial<WindowInstance>) => void;
  maxZIndex: number;
}

const apps: App[] = [
  { id: 'notepad', title: 'Notepad', icon: 'https://img.icons8.com/fluency/48/notepad.png', component: Notepad, defaultSize: { width: 400, height: 300 } },
  { id: 'about', title: 'About', icon: 'https://img.icons8.com/fluency/48/about.png', component: About, defaultSize: { width: 350, height: 250 } },
  { id: 'vite', title: 'Vite', icon: '/icons/vite.svg', component: ViteApp, defaultSize: { width: 300, height: 300 } },
  { id: 'react', title: 'React', icon: reactLogo, component: ReactApp, defaultSize: { width: 300, height: 300 } },
];

const Desktop: React.FC<DesktopProps> = ({
  windows,
  onOpenWindow,
  onCloseWindow,
  onMinimizeWindow,
  onFocusWindow,
  updateWindowState,
  maxZIndex,
}) => {
  return (
    <DesktopContainer>
      <IconGrid>
        {apps.map(app => (
          <Icon key={app.id} app={app} onDoubleClick={onOpenWindow} />
        ))}
      </IconGrid>
      {windows.map(window => (
        <Window
          key={window.id}
          window={window}
          onClose={onCloseWindow}
          onMinimize={onMinimizeWindow}
          onFocus={onFocusWindow}
          updateWindowState={updateWindowState}
          isFocused={window.zIndex === maxZIndex}
        />
      ))}
    </DesktopContainer>
  );
};

export default Desktop;
