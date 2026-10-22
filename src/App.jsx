
import Header from './components/Header.jsx';
import NavBar from './components/NavBar.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const myName = 'Your Name';

  const mySkills = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'C++'
  ];

  return (
    <div id="home">
      <Header
        name={myName}
        themeColor="#20345C"
      />

      <NavBar />

      <main>
        <About name={myName} />

        <Skills skillList={mySkills} />

        <Projects />
      </main>

      <Footer email="your.email@example.com" />
    </div>
  );
}

export default App;
