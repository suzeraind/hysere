import React from 'react';
import styled from 'styled-components';
import useWindowsStore from '../../store/useWindowsStore';

const TaskbarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: #222;
  display: flex;
  align-items: center;
  padding: 0 10px;
  z-index: 100000;
`;

const TaskbarIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  margin: 0 5px;
  background: #444;
  color: white;
  border-radius: 3px;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    margin-right: 5px;
  }
`;

const Taskbar: React.FC = () => {
  const { windows, focusWindow } = useWindowsStore();

  return (
    <TaskbarContainer>
      {windows.map(window => (
        <TaskbarIcon key={window.id} onClick={() => focusWindow(window.id)}>
          <img src={window.app.icon} alt={window.app.title} />
          <span>{window.app.title}</span>
        </TaskbarIcon>
      ))}
    </TaskbarContainer>
  );
};

export default Taskbar;