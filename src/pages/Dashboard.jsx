import { useState, useEffect, lazy, Suspense } from 'react';
import { getTasks } from '../api';
import Spinner from '../components/Spinner.jsx';

// Component-level Lazy Loading (Practical 8 Supplementary requirement)
const HeavyChart = lazy(() => import('../components/HeavyChart.jsx'));

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        getTasks()
            .then((data) => {
                if (isMounted && Array.isArray(data)) {
                    setTasks(data);
                }
            })
            .catch(() => {
                // If offline or unauthenticated, default empty tasks
                if (isMounted) setTasks([]);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const completedCount = tasks.filter((t) => t.completed).length;
    const pendingCount = tasks.length - completedCount;

    return (
        <main className="section dashboard-page">
            <div className="dashboard-header">
                <h2>Project Dashboard</h2>
                <p>Here you can view charts and statistics for all your projects.</p>
            </div>

            <div className="dashboard-stats-grid">
                <div className="stat-card">
                    <span className="stat-num stat-pending">{pendingCount}</span>
                    <span className="stat-label">Pending Tasks</span>
                </div>
                <div className="stat-card">
                    <span className="stat-num stat-completed">{completedCount}</span>
                    <span className="stat-label">Completed Tasks</span>
                </div>
                <div className="stat-card">
                    <span className="stat-num stat-total">{tasks.length}</span>
                    <span className="stat-label">Total Tasks</span>
                </div>
            </div>

            {loading ? (
                <Spinner message="Loading task statistics..." />
            ) : (
                <Suspense
                    fallback={
                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <Spinner message="Loading heavy chart library..." />
                        </div>
                    }
                >
                    <HeavyChart tasks={tasks} />
                </Suspense>
            )}
        </main>
    );
}

