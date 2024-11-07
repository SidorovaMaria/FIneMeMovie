import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import FilmsGallery from "./components/Films/FilmsGallery";
import FilmPage from "./components/Films/FilmPage";

function App() {
  return (
    <Router>
      {/* NAVIGATION AND BREADCRUMBS  */}
      <NavBar />
      <Routes>
        <Route path="/" element={<FilmsGallery />} />
        <Route path="/film/:filmId" element={<FilmPage />} />
      </Routes>
    </Router>
  );
}

export default App;
