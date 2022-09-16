import React, { useContext } from "react";
import { CopyBlock, atomOneDark } from "react-code-blocks";
import { AppContext } from "../AppContext";
import { AppContextProps } from "../models/Interfaces";
import { Alert, Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { renderCodeSnippet } from "../functions/renderCodeSnippet";
import { Link } from "react-router-dom";

enum Language {
  SVG = "svg",
  JSON = "json",
}

export default function CodeSnippet() {
  const { elements, containerDimensions } =
    useContext<AppContextProps>(AppContext);
  const [language, setLanguage] = React.useState<Language | null>(Language.SVG);

  const handleLanguage = (
    event: React.MouseEvent<HTMLElement>,
    newLanguage: Language | null
  ) => {
    setLanguage(newLanguage);
  };

  if (!elements.length) {
    return (
      <Alert severity="info" sx={{ marginRight: 2 }}>
        You have to add some elements first, than you can see some code :) Start
        in the <Link to="/">Editor</Link>
      </Alert>
    );
  }

  return (
    <>
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
            text={renderCodeSnippet({ containerDimensions, elements })}
            language="jsx"
            showLineNumbers={false}
            theme={atomOneDark}
            wrapLines={false}
          />
        ) : (
          <CopyBlock
            text={JSON.stringify(
              { containerDimensions: { ...containerDimensions }, elements },
              null,
              2
            )}
            language="json"
            showLineNumbers={false}
            theme={atomOneDark}
            wrapLines={true}
          />
        )}
      </Box>
    </>
  );
}
