export interface DrawItemProps {
  id: string;
  width: number;
  height: number;
  posX: number;
  posY: number;
  rounded: number;
  isCircle?: boolean;
}

export type ContainerDimensionsProps = {
  width: number;
  height: number;
};

export interface AppContextProps {
  containerDimensions: ContainerDimensionsProps;
  setContainerDimensions: (dimesions: ContainerDimensionsProps) => void;
  gridSize: number;
  setGridSize: (size: number) => void;
  elements: DrawItemProps[];
  setElements: (elements: DrawItemProps[]) => void;
  selectedElement: string | null;
  setSelectedElement: (id: string | null) => void;
}
