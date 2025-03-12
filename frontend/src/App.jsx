import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Lista";
import Chapters from "./components/Chapters";
import EditChapter from "./components/EditChapter";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">WebNovel Editor</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Lista</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chapters">Capítulos</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/edit/:id" element={<EditChapter />} />
        </Routes>
    </Router>
  );
}

export default App;
