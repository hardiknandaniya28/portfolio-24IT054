
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div id="home" className={darkMode ? 'app dark-mode' : 'app'}>
      <NavBar />

      <div className="theme-control">
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer email="hardiknandaniya616@gmail.com" />
    </div>
  );
}

export default App;
