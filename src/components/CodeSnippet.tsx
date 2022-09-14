import React, { useContext } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import prettyFormat from "pretty-format";
import renderer from "react-test-renderer";
import { AppContext } from "../AppContext";
import { SVGrender } from "./Preview";
import { AppContextProps } from "../models/Interfaces";
import { Box } from "@mui/material";
const { ReactTestComponent } = prettyFormat.plugins;

export default function CodeSnippet() {
  const { elements } = useContext<AppContextProps>(AppContext);

  return (
    <Box marginRight={2} marginBottom={2}>
      <CopyBlock
        text={prettyFormat(renderer.create(<>{SVGrender(elements)}</>), {
          plugins: [ReactTestComponent],
          printFunctionName: false,
        })}
        language="jsx"
        showLineNumbers={false}
        theme={dracula}
        wrapLines={false}
      />
    </Box>
  );
}
