import { useState, useEffect, useCallback } from 'react';
import { getTasks, getCurrentUser } from '../api';
import TaskForm from './TaskForm.jsx';
import TaskItem from './TaskItem.jsx';
import Auth from './Auth.jsx';
import Toast from './Toast.jsx';
import Spinner from './Spinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';

export default function TaskManager() {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState({ message: '', type: 'success' });

    const showToast = useCallback((message, type = 'success') => {
        setToast({ message, type });
    }, []);

    const hideToast = useCallback(() => {
        setToast({ message: '', type: 'success' });
    }, []);

    // Logout handler
    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setTasks([]);
        showToast('Logged out successfully', 'success');
    }, [showToast]);

    // Fetch user details (/me) when authenticated
    useEffect(() => {
        if (!token) return;

        getCurrentUser()
            .then((data) => {
                if (data && data.user) {
                    setUser(data.user);
                }
            })
            .catch((err) => {
                // If token invalid/expired, log out
                if (err.message && err.message.includes('Session expired')) {
                    handleLogout();
                }
            });
    }, [token, handleLogout]);

    // Fetch tasks list
    const fetchTasksList = useCallback(async () => {
        if (!token) return;

        setLoading(true);
        setError(null);
        try {
            const data = await getTasks();
            if (Array.isArray(data)) {
                setTasks(data);
            } else if (data.error) {
                throw new Error(data.error);
            } else {
                setTasks([]);
            }
        } catch (err) {
            const errMsg = err.message || 'Failed to load tasks from backend';
            setError(errMsg);
            showToast(errMsg, 'error');

            // Handle token expiration/unauthorized
            if (errMsg.includes('Session expired') || errMsg.includes('unauthorized') || errMsg.includes('Access denied')) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    }, [token, showToast, handleLogout]);

    useEffect(() => {
        if (token) {
            fetchTasksList();
        }
    }, [token, fetchTasksList]);

    const handleAuthSuccess = (authenticatedUser) => {
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
        if (authenticatedUser) {
            setUser(authenticatedUser);
        }
    };

    const handleCreated = useCallback((newTask) => {
        setTasks((prev) => [newTask, ...prev]);
    }, []);

    const handleUpdated = useCallback((updatedTask) => {
        setTasks((prev) =>
            prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
        );
    }, []);

    const handleDeleted = useCallback((id) => {
        setTasks((prev) => prev.filter((t) => t._id !== id));
    }, []);

    // If user is not authenticated, show Auth card (Login / Register)
    if (!token) {
        return (
            <div className="task-manager-container">
                {toast.message && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={hideToast}
                    />
                )}
                <Auth onAuthSuccess={handleAuthSuccess} showToast={showToast} />
            </div>
        );
    }

    const pendingCount = tasks.filter((t) => !t.completed).length;
    const doneCount = tasks.filter((t) => t.completed).length;

    return (
        <div className="task-manager-container">
            {toast.message && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}

            {/* Task Manager Header matching friend's reference with Logout */}
            <div className="task-manager-header">
                <div>
                    <h1 className="task-manager-title">Task Manager</h1>
                    <p className="task-manager-subtitle">
                        Manage your daily goals seamlessly.
                        {user && user.email && (
                            <span className="user-email-tag"> ({user.email})</span>
                        )}
                    </p>
                </div>
                <div className="task-header-actions">
                    <div className="task-stats-badges">
                        <span className="badge-stat badge-pending">
                            {pendingCount} pending
                        </span>
                        <span className="badge-stat badge-done">
                            {doneCount} done
                        </span>
                    </div>
                    <button
                        type="button"
                        className="btn btn-logout"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            </div>

            {/* Form to create new task */}
            <div className="task-card-wrapper">
                <TaskForm onCreated={handleCreated} showToast={showToast} />
            </div>

            {/* All Tasks List Section */}
            <div className="task-list-section">
                <h3 className="all-tasks-label">
                    ALL TASKS ({tasks.length})
                </h3>

                {loading ? (
                    <Spinner message="Loading your tasks..." />
                ) : error ? (
                    <ErrorMessage
                        title="Unable to load tasks"
                        message={error}
                        onRetry={fetchTasksList}
                    />
                ) : tasks.length === 0 ? (
                    <div className="empty-tasks-message">
                        <p>No tasks yet. Create your first task above!</p>
                    </div>
                ) : (
                    <div className="task-items-list">
                        {tasks.map((task) => (
                            <TaskItem
                                key={task._id}
                                task={task}
                                onUpdated={handleUpdated}
                                onDeleted={handleDeleted}
                                showToast={showToast}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
