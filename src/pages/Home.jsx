
import Header from '../components/Header.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';

function Home() {
    const myName = 'Hardik Nandaniya';

    const mySkills = [
        'HTML',
        'CSS',
        'JavaScript',
        'React',
        'C++'
    ];

    return (
        <>
            <Header name={myName} themeColor="#F97316" />

            <main>
                <About name={myName} />
                <Skills skillList={mySkills} />
            </main>
        </>
    );
}

export default Home;
