
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <main className="section">
            <h2>404 - Page Not Found</h2>

            <p>
                Sorry, the page you are looking for does not exist.
            </p>

            <Link to="/">Return to Home</Link>
        </main>
    );
}

export default NotFound;
