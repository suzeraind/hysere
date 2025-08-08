import React, { useState } from 'react';
import styled from 'styled-components';
import { apps } from '../../apps';
import useWindowsStore from '../../store/useWindowsStore';

const StartMenuContainer = styled.div`
  position: absolute;
  bottom: 58px; /* Height of the taskbar + margin */
  left: 10px;
  width: 350px;
  height: 500px;
  background: rgba(40, 44, 52, 0.85);
  backdrop-filter: blur(15px);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 99999;
  display: flex;
  flex-direction: column;
  color: var(--text-color);
`;

const SearchInput = styled.input`
  width: calc(100% - 24px);
  margin: 12px;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background: var(--secondary-bg);
  color: var(--text-color);
  font-size: 14px;

  &::placeholder {
    color: #a0a0a0;
  }
`;

const AppList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0 12px 12px;
  flex-grow: 1;
  overflow-y: auto;
`;

const AppListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(97, 218, 251, 0.2);
  }

  img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }

  span {
    font-size: 15px;
    font-weight: 500;
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
        placeholder="Type to search..."
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
