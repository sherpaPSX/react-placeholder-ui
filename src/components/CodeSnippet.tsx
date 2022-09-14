import React, { useContext } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import prettyFormat from "pretty-format";
import renderer from "react-test-renderer";
import { AppContext } from "../AppContext";
import { SVGrender } from "./Preview";
import { AppContextProps } from "../models/Interfaces";
const { ReactTestComponent } = prettyFormat.plugins;

export default function CodeSnippet() {
  const { elements } = useContext<AppContextProps>(AppContext);

  return (
    <CodeBlock
      text={prettyFormat(renderer.create(<>{SVGrender(elements)}</>), {
        plugins: [ReactTestComponent],
        printFunctionName: false,
      })}
      language="jsx"
      showLineNumbers={false}
      theme={dracula}
    />
  );
}
