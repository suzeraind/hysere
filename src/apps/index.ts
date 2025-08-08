import { type App } from '../types';
import About from './About';
import Notepad from './Notepad';
import ViteApp from './ViteApp';
import ReactApp from './ReactApp';

export const apps: App[] = [

  {
    id: 'about',
    title: 'About',
    icon: '/icons/info.svg',
    component: About,
  },
  {
    id: 'notepad',
    title: 'Notepad',
    icon: '/icons/notepad.svg',
    component: Notepad,
    defaultSize: {
      width: 500,
      height: 600,
    }
  },
  {
    id: 'vite',
    title: 'Vite App',
    icon: '/icons/vite.svg',
    component: ViteApp,
  },
  {
    id: 'react',
    title: 'React App',
    icon: '/icons/react.svg',
    component: ReactApp,
  }
];
