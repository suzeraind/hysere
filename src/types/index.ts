export interface App {
  id: string;
  title: string;
  icon: string;
  component: React.ComponentType;
  defaultSize?: {
    width: number;
    height: number;
  };
}

export interface WindowInstance {
  id: string;
  app: App;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized: boolean;
}

export interface IconPosition {
  x: number;
  y: number;
}
