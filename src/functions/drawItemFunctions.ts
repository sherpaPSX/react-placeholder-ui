import uniqid from "uniqid";
import { DrawItemProps } from "../models/Interfaces";

export class DrawItemFunctions {
  elements: DrawItemProps[];
  setElements: (elements: DrawItemProps[]) => void;
  setSelectedElement: (id: string | null) => void;
  constructor(
    elements: DrawItemProps[],
    setElements: (elements: DrawItemProps[]) => void,
    setSelectdElement: (id: string | null) => void
  ) {
    this.elements = elements;
    this.setElements = setElements;
    this.setSelectedElement = setSelectdElement;
  }

  onUpdate(ev: DrawItemProps) {
    const newState = this.elements.map((item) => {
      if (item.id === ev.id) {
        return ev;
      }
      return item;
    });

    this.setElements(newState);
  }

  onClone(ev: DrawItemProps) {
    const id = uniqid();
    this.setSelectedElement(id);
    this.setElements([
      ...this.elements,
      {
        width: ev.width,
        height: ev.height,
        posX: ev.posX + 10,
        posY: ev.posY + 10,
        rounded: ev.rounded,
        id,
        isCircle: ev.isCircle,
      },
    ]);
  }

  onDelete(id: string) {
    this.setSelectedElement(null);
    const newState = this.elements.filter((item) => item.id !== id);
    this.setElements(newState);
  }

  renderNewElement(isCircle?: boolean) {
    const id = uniqid();
    this.setSelectedElement(id);
    return {
      width: 100,
      height: 100,
      posX: 0,
      posY: 0,
      rounded: 0,
      id,
      isCircle: isCircle ? isCircle : undefined,
    } as DrawItemProps;
  }

  roundToNearest(num: number, incrementor: number) {
    return Math.round(num / incrementor) * incrementor;
  }
}
