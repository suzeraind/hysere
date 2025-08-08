import React, { useState } from 'react';
import styled from 'styled-components';
import { apps } from '../../apps';
import useWindowsStore from '../../store/useWindowsStore';

const StartMenuContainer = styled.div`
  position: absolute;
  bottom: 40px; /* Height of the taskbar */
  left: 0;
  width: 300px;
  height: 400px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-top-right-radius: 5px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
  z-index: 99999;
  display: flex;
  flex-direction: column;
`;

const SearchInput = styled.input`
  width: calc(100% - 20px);
  margin: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const AppList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 10px;
  flex-grow: 1;
  overflow-y: auto;
`;

const AppListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background: #e0e0e0;
  }

  img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
`;

interface StartMenuProps {
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { openWindow } = useWindowsStore();

  const filteredApps = apps.filter(app =>
    app.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAppClick = (app: (typeof apps)[0]) => {
    openWindow(app);
    onClose();
  };

  return (
    <StartMenuContainer>
      <SearchInput
        type="text"
        placeholder="Search for apps..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <AppList>
        {filteredApps.map(app => (
          <AppListItem key={app.id} onClick={() => handleAppClick(app)}>
            <img src={app.icon} alt={app.title} />
            <span>{app.title}</span>
          </AppListItem>
        ))}
      </AppList>
    </StartMenuContainer>
  );
};

export default StartMenu;
