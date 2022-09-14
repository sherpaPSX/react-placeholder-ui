import "./style.scss";

import { createContext, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import DrawItemProps from "./models/DrawItem";
import DrawItem from "./components/DrawItem";
import uniqid from "uniqid";
import { CodeBlock, dracula } from "react-code-blocks";
import prettyFormat from "pretty-format";
import renderer from "react-test-renderer";
import Preview, { SVGrender } from "./components/Preview";
import ContentLoader from "react-content-loader";
const { ReactTestComponent } = prettyFormat.plugins;

type ContainerDimensionsProps = {
  width: number;
  height: number;
};
export interface AppContextProps {
  containerHeight: number;
  containerDimensions: ContainerDimensionsProps;
  gridSize: number;
  elements: DrawItemProps[];
}

export const AppContext = createContext<AppContextProps>({
  containerHeight: 1000,
  containerDimensions: {
    width: 1000,
    height: 500,
  },
  gridSize: 10,
  elements: [],
});

const renderInitialState = (isCircle?: boolean) => {
  return {
    width: 100,
    height: 100,
    posX: 0,
    posY: 0,
    id: uniqid(),
    isNew: true,
    isCircle: isCircle ? isCircle : undefined,
  } as DrawItemProps;
};

function App() {
  const [containerHeight, setContainerHeight] = useState<number>(1500);
  const [gridSize, setGridSize] = useState<number>(20);
  const [elements, setElements] = useState<DrawItemProps[]>([]);

  const onUpdateHadler = (ev: DrawItemProps) => {
    const newState = elements.map((item) => {
      if (item.id === ev.id) {
        return ev;
      }
      return item;
    });

    setElements(newState);
  };

  const onCloneHandler = (ev: DrawItemProps) => {
    setElements([
      ...elements,
      {
        width: ev.width,
        height: ev.height,
        posX: 0,
        posY: 0,
        id: uniqid(),
        isNew: true,
      },
    ]);
  };

  const onDeleteHandler = (id: string) => {
    const newState = elements.filter((item) => item.id !== id);
    setElements(newState);
  };

  return (
    <AppContext.Provider value={{ containerHeight, gridSize, elements }}>
      <header>
        <input
          type="number"
          step={1}
          placeholder="Grid size"
          value={gridSize}
          onChange={(ev) => setGridSize(parseInt(ev.target.value))}
        />
        <input
          type="number"
          step={gridSize}
          placeholder="Container height"
          value={containerHeight}
          onChange={(ev) => setContainerHeight(parseInt(ev.target.value))}
        />

        <button
          onClick={() => setElements([...elements, renderInitialState()])}
        >
          Add rectangle
        </button>
        <button
          onClick={() => setElements([...elements, renderInitialState(true)])}
        >
          Add circle
        </button>
      </header>
      <div style={{ position: "relative" }}>
        <Rnd
          disableDragging={true}
          size={{ width: 1001, height: containerHeight + 1 }}
          className="wrapper"
          style={{
            height: containerHeight + 1,
            backgroundSize: `${gridSize}px ${gridSize}px`,
          }}
        >
          {elements.map((item) => (
            <DrawItem
              {...item}
              key={item.id}
              onUpdate={onUpdateHadler}
              onClone={onCloneHandler}
              onDelete={onDeleteHandler}
            />
          ))}
        </Rnd>
      </div>
      <CodeBlock
        text={prettyFormat(renderer.create(<>{SVGrender(elements)}</>), {
          plugins: [ReactTestComponent],
          printFunctionName: false,
        })}
        language="jsx"
        showLineNumbers={false}
        theme={dracula}
      />
      <Preview />
    </AppContext.Provider>
  );
}

export default App;
