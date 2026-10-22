
import { useEffect, useState } from 'react';
import Spinner from './Spinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';

function Projects() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    // Change this to your own GitHub username.
    const username = 'hardiknandaniya28';

    async function fetchRepos() {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
            );

            if (!response.ok) {
                throw new Error(
                    response.status === 404
                        ? 'GitHub username was not found.'
                        : `GitHub request failed (${response.status}). Please try again.`
                );
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                throw new Error('Unexpected data received from GitHub.');
            }

            setRepos(data);
        } catch (err) {
            setError(err.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRepos();
    }, []);

    const filteredRepos = repos.filter((repo) =>
        repo.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <ErrorMessage
                message={error}
                onRetry={fetchRepos}
            />
        );
    }

    return (
        <section className="section">
            <h2>My GitHub Projects</h2>

            <p>
                Explore repositories retrieved directly from the GitHub API.
            </p>

            <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search repositories by name..."
                aria-label="Search repositories by name"
                className="repo-search"
            />

            <p className="repo-count">
                Showing {filteredRepos.length} of {repos.length} repositories
            </p>

            {filteredRepos.length === 0 ? (
                <p>No repositories match your search.</p>
            ) : (
                <div className="projects-grid">
                    {filteredRepos.map((repo) => (
                        <article className="project-card" key={repo.id}>
                            <h3>{repo.name}</h3>

                            <p>
                                {repo.description || 'No description provided.'}
                            </p>

                            <p>
                                ⭐ {repo.stargazers_count} stars
                            </p>

                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View Repository →
                            </a>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Projects;
