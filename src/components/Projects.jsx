
function Projects() {
    const projectList = [
        {
            id: 1,
            name: 'Portfolio Website',
            description: 'A personal website built with React.'
        },
        {
            id: 2,
            name: 'Weather App',
            description: 'A simple application for weather updates.'
        },
        {
            id: 3,
            name: 'Student Management System',
            description: 'An application to organize student records.'
        }
    ];

    return (
        <section id="projects" className="section">
            <h2>My Projects</h2>

            <div className="projects-grid">
                {projectList.map((project) => (
                    <article className="project-card" key={project.id}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Projects;
