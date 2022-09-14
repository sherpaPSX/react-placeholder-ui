import "./style.scss";
import Preview from "./components/Preview";
import CodeSnippet from "./components/CodeSnippet";
import Editor from "./components/editor/Editor";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";
import Footer from "./components/Footer";

function App() {
  return (
    <Box display="flex" flexDirection="column" sx={{ minHeight: "100vh" }}>
      <Navbar />
      <Box
        sx={{ flexGrow: 1, overflow: "auto", flexDirection: "column" }}
        display="flex"
      >
        <Routes>
          <Route path="/" element={<Editor />}></Route>
          <Route path="/code" element={<CodeSnippet />}></Route>
          <Route path="/preview" element={<Preview />}></Route>
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
