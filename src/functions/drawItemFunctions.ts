import uniqid from "uniqid";
import { DrawItemProps } from "../models/Interfaces";

export class DrawItemFunctions {
  elements: DrawItemProps[];
  setElements: (elements: DrawItemProps[]) => void;
  constructor(
    elements: DrawItemProps[],
    setElements: (elements: DrawItemProps[]) => void
  ) {
    this.elements = elements;
    this.setElements = setElements;
  }

  onUpdateHadler(ev: DrawItemProps) {
    const newState = this.elements.map((item) => {
      if (item.id === ev.id) {
        return ev;
      }
      return item;
    });

    this.setElements(newState);
  }

  onCloneHandler(ev: DrawItemProps) {
    this.setElements([
      ...this.elements,
      {
        width: ev.width,
        height: ev.height,
        posX: 0,
        posY: 0,
        id: uniqid(),
        isNew: true,
        isCircle: ev.isCircle,
      },
    ]);
  }

  onDeleteHandler(id: string) {
    const newState = this.elements.filter((item) => item.id !== id);
    this.setElements(newState);
  }
}
