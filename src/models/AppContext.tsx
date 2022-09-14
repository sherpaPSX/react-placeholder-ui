import { createContext, ReactNode, useState } from "react";
import DrawItemProps from "./DrawItem";

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
}

export const AppContext = createContext<AppContextProps>({
  containerDimensions: {
    width: 0,
    height: 0,
  },
  setContainerDimensions: () => {},
  gridSize: 0,
  setGridSize: () => {},
  elements: [],
  setElements: () => {},
});

export default function AppContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [containerDimensions, setContainerDimensions] =
    useState<ContainerDimensionsProps>({ width: 1000, height: 500 });
  const [gridSize, setGridSize] = useState<number>(20);
  const [elements, setElements] = useState<DrawItemProps[]>([]);

  return (
    <AppContext.Provider
      value={{
        containerDimensions,
        setContainerDimensions,
        gridSize,
        setGridSize,
        elements,
        setElements,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
