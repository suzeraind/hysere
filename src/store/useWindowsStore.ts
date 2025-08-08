import { create } from 'zustand';
import { type App, type WindowInstance } from '../types';

interface WindowsStore {
  windows: WindowInstance[];
  focusedWindowId: string | null;
  openWindow: (app: App) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
}

const useWindowsStore = create<WindowsStore>((set) => ({
  windows: [],
  focusedWindowId: null,
  openWindow: (app) =>
    set((state) => {
      const existingWindow = state.windows.find((w) => w.id === app.id);
      const newZIndex = Math.max(...state.windows.map(w => w.zIndex), 0) + 1;
      if (existingWindow) {
        return {
          windows: state.windows.map((w) =>
            w.id === app.id ? { ...w, isMinimized: false, zIndex: newZIndex } : w
          ),
          focusedWindowId: app.id,
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
            zIndex: newZIndex,
          },
        ],
        focusedWindowId: app.id,
      };
    }),
  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId,
    })),
  focusWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: Math.max(...state.windows.map(w => w.zIndex), 0) + 1 } : w
      ),
      focusedWindowId: id,
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
