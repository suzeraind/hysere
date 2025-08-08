import React from 'react';
import styled from 'styled-components';
import useWindowsStore from '../../store/useWindowsStore';
import Window from './Window';
import Icon from './Icon';
import { apps } from '../../apps';

const DesktopContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 20px;
`;

const Desktop: React.FC = () => {
  const { windows, openWindow } = useWindowsStore();

  return (
    <DesktopContainer>
      {apps.map(app => (
        <Icon key={app.id} app={app} onDoubleClick={() => openWindow(app)} />
      ))}
      {windows.map((window) => (
        <Window key={window.id} window={window} />
      ))}
    </DesktopContainer>
  );
};

export default Desktop;