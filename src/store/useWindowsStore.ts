import { create } from 'zustand';
import { type App, type WindowInstance } from '../types';

interface WindowsStore {
  windows: WindowInstance[];
  openWindow: (app: App) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
}

const useWindowsStore = create<WindowsStore>((set) => ({
  windows: [],
  openWindow: (app) =>
    set((state) => {
      const existingWindow = state.windows.find((w) => w.id === app.id);
      if (existingWindow) {
        return {
          windows: state.windows.map((w) =>
            w.id === app.id ? { ...w, isMinimized: false, zIndex: Math.max(...state.windows.map(w => w.zIndex), 0) + 1 } : w
          ),
        };
      }
      return {
        windows: [
          ...state.windows,
          {
            id: app.id,
            app,
            x: 50,
            y: 50,
            width: app.defaultSize?.width || 640,
            height: app.defaultSize?.height || 480,
            isMinimized: false,
            zIndex: state.windows.length > 0 ? Math.max(...state.windows.map(w => w.zIndex), 0) + 1 : 1,
          },
        ],
      };
    }),
  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    })),
  focusWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: Math.max(...state.windows.map(w => w.zIndex), 0) + 1 } : w
      ),
    })),
  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    })),
  updateWindowPosition: (id, x, y) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, x, y } : w
      ),
    })),
    updateWindowSize: (id, width, height) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, width, height } : w
      ),
    })),
}));

export default useWindowsStore;
