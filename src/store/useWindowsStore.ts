import { create } from 'zustand';
import { type App, type WindowInstance, type IconPosition } from '../types';
import { apps } from '../apps';

interface WindowsStore {
  windows: WindowInstance[];
  focusedWindowId: string | null;
  iconPositions: Record<string, IconPosition>;
  openWindow: (app: App) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  updateIconPosition: (id: string, x: number, y: number) => void;
}

const GRID_SIZE = 100; // Consistent grid size

const initialIconPositions: Record<string, IconPosition> = {};
apps.forEach((app, index) => {
  initialIconPositions[app.id] = {
    x: (index % 8) * GRID_SIZE,
    y: Math.floor(index / 8) * GRID_SIZE,
  };
});

const useWindowsStore = create<WindowsStore>((set, get) => ({
  windows: [],
  focusedWindowId: null,
  iconPositions: initialIconPositions,
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
  updateIconPosition: (id, x, y) =>
    set(() => {
      const currentPositions = get().iconPositions;
      const isOccupied = Object.entries(currentPositions).some(
        ([iconId, pos]) => iconId !== id && pos.x === x && pos.y === y
      );

      if (isOccupied) {
        return {};
      }

      return {
        iconPositions: {
          ...currentPositions,
          [id]: { x, y },
        },
      };
    }),
}));

export default useWindowsStore;
