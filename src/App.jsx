import { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import DelayedFallback from './components/DelayedFallback.jsx';

// Route-based code splitting using React.lazy() (Practical 8 Core Requirement)
const Home = lazy(() => import('./pages/Home.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'));
const TasksPage = lazy(() => import('./pages/TasksPage.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

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

      {/* Route-level Suspense with minimum-delay fallback (300ms) */}
      <Suspense fallback={<DelayedFallback delay={300} message="Loading page..." />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer email="hardiknandaniya616@gmail.com" />
    </div>
  );
}

export default App;
