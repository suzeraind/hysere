import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import useWindowsStore from '../../store/useWindowsStore';
import StartMenu from './StartMenu';

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

const StartButton = styled.button`
  background: #444;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
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
  const [isStartMenuOpen, setStartMenuOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement>(null);

  const toggleStartMenu = () => {
    setStartMenuOpen(!isStartMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
      setStartMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isStartMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isStartMenuOpen]);

  return (
    <>
      <TaskbarContainer>
        <StartButton onClick={toggleStartMenu}>Start</StartButton>
        {windows.map(window => (
          <TaskbarIcon key={window.id} onClick={() => focusWindow(window.id)}>
            <img src={window.app.icon} alt={window.app.title} />
            <span>{window.app.title}</span>
          </TaskbarIcon>
        ))}
      </TaskbarContainer>
      <div ref={startMenuRef}>
        {isStartMenuOpen && <StartMenu onClose={() => setStartMenuOpen(false)} />}
      </div>
    </>
  );
};

export default Taskbar;