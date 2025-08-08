import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import useWindowsStore from '../../store/useWindowsStore';
import StartMenu from './StartMenu';
import Clock from './Clock';

const TaskbarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background: rgba(40, 44, 52, 0.75);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  padding: 0 10px;
  z-index: 100000;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const StartButton = styled.button`
  background: var(--accent-color);
  color: var(--primary-bg);
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #88e1fc;
  }
`;

const TaskbarIcon = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  margin: 0 4px;
  background: ${({ isActive }) => (isActive ? 'rgba(97, 218, 251, 0.3)' : 'transparent')};
  color: var(--text-color);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 2px solid ${({ isActive }) => (isActive ? 'var(--accent-color)' : 'transparent')};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  span {
    font-size: 14px;
  }
`;

const Taskbar: React.FC = () => {
  const { windows, focusWindow, focusedWindowId } = useWindowsStore();
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
          <TaskbarIcon
            key={window.id}
            onClick={() => focusWindow(window.id)}
            isActive={window.id === focusedWindowId}
          >
            <img src={window.app.icon} alt={window.app.title} />
            <span>{window.app.title}</span>
          </TaskbarIcon>
        ))}
        <Spacer />
        <Clock />
      </TaskbarContainer>
      <div ref={startMenuRef}>
        {isStartMenuOpen && <StartMenu onClose={() => setStartMenuOpen(false)} />}
      </div>
    </>
  );
};

export default Taskbar;