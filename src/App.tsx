import "./style.scss";
import Preview from "./components/Preview";
import CodeSnippet from "./components/CodeSnippet";
import Editor from "./components/editor/Editor";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";
import Footer from "./components/Footer";
import TopToolBar from "./components/toolbar/TopToolBar";
import Toolbar from "./components/toolbar/Toolbar";
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { AppContextProps } from "./models/Interfaces";

function App() {
  const { elements } = useContext<AppContextProps>(AppContext);

  useEffect(() => {
    const unloadCallback = (event: any) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    if (elements.length) {
      window.addEventListener("beforeunload", unloadCallback);
      return () => window.removeEventListener("beforeunload", unloadCallback);
    }
  }, [elements]);

  return (
    <Box display="flex" flexDirection="column" sx={{ height: "100vh" }}>
      <Navbar />
      <Box
        sx={{ flexGrow: 1, overflow: "auto", flexDirection: "column" }}
        display="flex"
      >
        <TopToolBar />
        <Box display="flex" sx={{ flexGrow: 1, overflow: "auto" }}>
          <Toolbar />
          <Box
            width="100%"
            marginTop={2}
            marginLeft={2}
            sx={{ overflow: "auto" }}
          >
            <Routes>
              <Route path="/" element={<Editor />}></Route>
              <Route path="/code" element={<CodeSnippet />}></Route>
              <Route path="/preview" element={<Preview />}></Route>
              <Route path="*" element={<Editor />} />
            </Routes>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
