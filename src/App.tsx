import "./style.scss";
import Preview from "./components/Preview";
import CodeSnippet from "./components/CodeSnippet";
import Editor from "./components/editor/Editor";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Editor</Link>
          </li>
          <li>
            <Link to="/code">Code</Link>
          </li>
          <li>
            <Link to="/preview">Preview</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Editor />}></Route>
        <Route path="/code" element={<CodeSnippet />}></Route>
        <Route path="/preview" element={<Preview />}></Route>
      </Routes>
    </>
  );
}

export default App;
