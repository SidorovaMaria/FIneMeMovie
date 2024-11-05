import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import FilmsGallery from "./components/Films/FilmsGallery";

function App() {
  return (
    <Router>
      {/* NAVIGATION AND BREADCRUMBS  */}
      <NavBar />
      <Routes>
        <Route path="/" element={<FilmsGallery />} />
      </Routes>
    </Router>
  );
}

export default App;
