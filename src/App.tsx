import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyles';
import Desktop from './components/system/Desktop';
import Taskbar from './components/system/Taskbar';
import { useWindows } from './hooks/useWindows';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => {
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    focusWindow,
    updateWindowState,
    restoreWindow,
  } = useWindows();

  const maxZIndex = Math.max(0, ...windows.map(w => w.zIndex));

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Desktop
          windows={windows}
          onOpenWindow={openWindow}
          onCloseWindow={closeWindow}
          onMinimizeWindow={minimizeWindow}
          onFocusWindow={focusWindow}
          updateWindowState={updateWindowState}
          maxZIndex={maxZIndex}
        />
        <Taskbar windows={windows} onRestoreWindow={restoreWindow} />
      </AppContainer>
    </>
  );
};

export default App;