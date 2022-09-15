import React, { useContext } from "react";
import { CopyBlock, CodeBlock, dracula } from "react-code-blocks";
import prettyFormat from "pretty-format";
import renderer from "react-test-renderer";
import { AppContext } from "../AppContext";
import { SVGrender } from "./Preview";
import { AppContextProps } from "../models/Interfaces";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Link as MuiLInk,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
const { ReactTestComponent } = prettyFormat.plugins;

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

  console.log(language);

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
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <strong>USAGE</strong>
          </AccordionSummary>
          <AccordionDetails>
            You have to copy rendered SVGs and wrap them with your skeleton
            component. I am using{" "}
            <MuiLInk href="https://skeletonreact.com/" target="_blank">
              React Content Loader
            </MuiLInk>
            <Typography component="p" marginTop={2}>
              Do not forgot to set your defined container dimesions{" "}
              <code style={{ fontWeight: "bold" }}>
                width="{containerDimensions.width}" height="
                {containerDimensions.height}"
              </code>{" "}
              and{" "}
              <code style={{ fontWeight: "bold" }}>
                viewBox="0 0 {containerDimensions.width}{" "}
                {containerDimensions.height}"
              </code>{" "}
              in case you need a resposive SVG
            </Typography>
            <Typography component="p" marginY={2}>
              My case would looks like this
            </Typography>
            <CodeBlock
              text={`<ContentLoader
    viewBox={0 0 ${containerDimensions.width} ${containerDimensions.height}}
    width={${containerDimensions.width}}
    height={${containerDimensions.height}}
  >
    ... SVG elements copied from bellow
  </ContentLoader>
  `}
              language="jsx"
              showLineNumbers={false}
              theme={dracula}
              wrapLines={true}
            />
            <Alert severity="warning" sx={{ marginTop: 2 }}>
              Elements are wrapped by a array cause i did not found a solution
              how to render without it. You have to trim is and use SVG elements
              only
            </Alert>
          </AccordionDetails>
        </Accordion>
      </Box>
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
    </>
  );
}
