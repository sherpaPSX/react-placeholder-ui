import { useContext } from "react";
import { AppContext } from "../../AppContext";
import uniqid from "uniqid";
import { AppContextProps, DrawItemProps } from "../../models/Interfaces";

const renderNewElement = (isCircle?: boolean) => {
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

export default function Toolbar() {
  const { elements, setElements } = useContext<AppContextProps>(AppContext);
  return (
    <aside>
      {" "}
      <button onClick={() => setElements([...elements, renderNewElement()])}>
        Add rectangle
      </button>
      <button
        onClick={() => setElements([...elements, renderNewElement(true)])}
      >
        Add circle
      </button>
    </aside>
  );
}
