import React, { useContext } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import prettyFormat from "pretty-format";
import renderer from "react-test-renderer";
import { AppContext } from "../AppContext";
import { SVGrender } from "./Preview";
import { AppContextProps } from "../models/Interfaces";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
const { ReactTestComponent } = prettyFormat.plugins;

enum Language {
  SVG = "svg",
  JSON = "json",
}

export default function CodeSnippet() {
  const { elements } = useContext<AppContextProps>(AppContext);
  const [language, setLanguage] = React.useState<Language | null>(Language.SVG);

  const handleLanguage = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: Language | null
  ) => {
    setLanguage(newLanguage);
  };

  console.log(language);

  return (
    <Box marginRight={2} marginBottom={2}>
      <Box sx={{ display: "flex", justifyContent: "end" }} marginBottom={1}>
        <ToggleButtonGroup
          size="small"
          value={language}
          exclusive
          onChange={handleLanguage}
          aria-label="text alignment"
        >
          <ToggleButton value="svg" aria-label="justified">
            SVG
          </ToggleButton>
          <ToggleButton value="json" aria-label="justified">
            JSON
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {language === Language.SVG ? (
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
      ) : (
        <CopyBlock
          text={JSON.stringify(elements, null, 2)}
          language="json"
          showLineNumbers={false}
          theme={dracula}
          wrapLines={false}
        />
      )}
    </Box>
  );
}
