import React from 'react';
import styled from 'styled-components';
import { type WindowInstance } from '../../types';

interface TaskbarProps {
  windows: WindowInstance[];
  onRestoreWindow: (id: string) => void;
}

const TaskbarContainer = styled.div`
  height: 40px;
  background-color: #222;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-top: 1px solid #666;
  z-index: 1001; /* Ensure taskbar is above windows */
`;

const StartButton = styled.button`
  width: 40px;
  height: 30px;
  background-color: #4caf50;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 3px;
  margin-right: 10px;
  cursor: pointer;
`;

const TaskbarIcons = styled.div`
  display: flex;
  gap: 5px;
`;

const TaskbarIcon = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? '#555' : '#333')};
  border: 1px solid #666;
  color: #fff;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #444;
  }
`;

const IconImage = styled.img`
  width: 20px;
  height: 20px;
`;

const Taskbar: React.FC<TaskbarProps> = ({ windows, onRestoreWindow }) => {
  return (
    <TaskbarContainer>
      <StartButton>OS</StartButton>
      <TaskbarIcons>
        {windows.map(window => (
          <TaskbarIcon
            key={window.id}
            isActive={!window.isMinimized}
            onClick={() => onRestoreWindow(window.id)}
          >
            <IconImage src={window.app.icon} alt={window.app.title} />
            {window.app.title}
          </TaskbarIcon>
        ))}
      </TaskbarIcons>
    </TaskbarContainer>
  );
};

export default Taskbar;
