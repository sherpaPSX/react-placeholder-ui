import { createContext, ReactNode, useState } from "react";
import {
  AppContextProps,
  ContainerDimensionsProps,
  DrawItemProps,
} from "./models/Interfaces";

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
  const [gridSize, setGridSize] = useState<number>(10);
  const [elements, setElements] = useState<DrawItemProps[]>([]);

  console.log(containerDimensions);

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
