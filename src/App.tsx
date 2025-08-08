import React from 'react';
import Desktop from './components/system/Desktop';
import Taskbar from './components/system/Taskbar';
import { GlobalStyle } from './styles/GlobalStyles';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Desktop />
      <Taskbar />
    </>
  );
};

export default App;
