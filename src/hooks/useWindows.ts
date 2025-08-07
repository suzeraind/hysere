import { useState, useCallback } from 'react';
import { type WindowInstance, type App } from '../types';

let windowIdCounter = 0;

export const useWindows = () => {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1);

  const openWindow = useCallback((app: App) => {
    setWindows(currentWindows => {
      const existingWindow = currentWindows.find(w => w.app.id === app.id && !w.isMinimized);
      if (existingWindow) {
        return currentWindows.map(w =>
          w.id === existingWindow.id ? { ...w, zIndex: nextZIndex + 1, isMinimized: false } : w
        );
      }

      const newWindow: WindowInstance = {
        id: `window-${windowIdCounter++}`,
        app,
        x: Math.random() * 200 + 50,
        y: Math.random() * 100 + 50,
        width: app.defaultSize?.width || 500,
        height: app.defaultSize?.height || 400,
        zIndex: nextZIndex + 1,
        isMinimized: false,
      };
      setNextZIndex(nextZIndex + 1);
      return [...currentWindows, newWindow];
    });
  }, [nextZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(currentWindows => currentWindows.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(currentWindows =>
      currentWindows.map(w => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(currentWindows => {
      const maxZIndex = Math.max(...currentWindows.map(w => w.zIndex));
      return currentWindows.map(w =>
        w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
      );
    });
    setNextZIndex(prev => prev + 1);
  }, []);

  const updateWindowState = useCallback((id: string, updates: Partial<WindowInstance>) => {
    setWindows(currentWindows =>
      currentWindows.map(w => (w.id === id ? { ...w, ...updates } : w))
    );
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows(currentWindows =>
      currentWindows.map(w =>
        w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex + 1 } : w
      )
    );
    setNextZIndex(nextZIndex + 1);
  }, [nextZIndex]);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    focusWindow,
    updateWindowState,
    restoreWindow,
  };
};
